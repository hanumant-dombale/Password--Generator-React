import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) {
      str += "1234567890";
    }
    if (isChar) {
      str += "!@#$%^&*(){}[];<,>.:";
    }
    for (let i = 0; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, isNumber, isChar, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isChar, passwordGenerator]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-slate-500 p-10 flex items-stretch flex-col gap-6 rounded-2xl">
        <h1 className="text-2xl self-center">Password Generator</h1>
        <div className="bg-black overflow-hidden flex rounded-xl">
          <input
            type="text"
            readOnly
            ref={passwordRef}
            placeholder="Password"
            className="p-3 outline-none w-full"
            value={password}
          />
          <button
            className="bg-gray-600 hover:bg-white hover:text-black p-3 shrink-0"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-3">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Langth: ({length})</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => {
                setIsNumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={isChar}
              onChange={() => {
                setIsChar((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
