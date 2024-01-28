import { useState, useCallback, useRef, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for(let i=1; i<length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPassword = ()=> {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(()=>{generatePassword()}, [charAllowed, numberAllowed, length])
  
  return (
    <div className='w-full max-w-screen-md mx-auto shadow-md
    rounded-lg px--4 py-3 my-8 bg-gray-800 text-orange-500'>

      <h1 className='test-white text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-md overflow-hidden mb-4 mx-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password' 
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>

      <div className='flex justify-center gap-x-4 text-sm'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> setLength(e.target.value)}
          name=""
          id=""
          />
          <label htmlFor="length">Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={()=> {
            setNumberAllowed((prev)=> !prev)
          }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed}
          onChange={()=> {
            setCharAllowed((prev)=> !prev)
          }}
          />
          <label htmlFor="char">Character</label>
        </div>
        {/* <div>
          <button className='text-white px-3 py-1 rounded-md bg-blue-700' onClick={generatePassword}>Generate</button>
        </div> */}
      </div>
    </div>
    
  )
}

export default App

