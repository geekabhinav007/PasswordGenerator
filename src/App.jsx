import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false);


  function copyToClipboard() {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  }
  

  function passwordGenerator() {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) {
      str += "1234567890"
    }
    if (character) {
      str += "~!@#$%^&*()-_=+[{]}|;:'\",<.>/?";
    }

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }

  useEffect(() => {
    passwordGenerator();
  }, [number, character, length]);


  return (
    <>
      <div class="flex flex-col items-center bg-gray-100 h-screen justify-center">
        <div class="text-2xl font-bold mb-5 text-blue-600">Password Generator</div>
        <div class="relative mb-5 w-2/3">
        <input id="password" type="text" value={password} class="border-2 border-gray-300 bg-white h-20 px-5 pr-16 rounded-lg text-xl focus:outline-none w-full" readOnly />
        <button onClick={copyToClipboard} class= "bg-blue-600 text-white rounded-lg absolute right-0 bottom-0 mt-2 mb-2 mr-4 pr-2 pl-2 ">Copy</button>

        </div>
        <div class="flex mb-5">
          <label class="inline-flex items-center mr-6">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" checked={number} onChange={() => setNumber(!number)} />
            <span class="ml-2 text-gray-700">Number</span>
          </label>
          <label class="inline-flex items-center mr-6">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" checked={character} onChange={() => setCharacter(!character)} />
            <span class="ml-2 text-gray-700">Character</span>
          </label>
        </div>
        <div>
          <input id="length"
            type="range"
            min="1"
            max="100"
            class="slider"
            value={length}
            onChange={(e) => setLength(e.target.value)} />
          <label for="length" class="ml-3">Password Length {length}</label>
        </div>
      </div>
    </>
  )
}

export default App
