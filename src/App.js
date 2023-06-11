import './App.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { COPY_FAIL, COPY_SUCCESS} from './message';

const App = () => {

  const[password, setPassword]=useState("")
  const[passwordLength, setPasswordLength]=useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = () => {
    if(!includeLowerCase && !includeNumbers && !includeUpperCase && !includeSymbols)
    {
      notify("to generate password u must select one checkboz", true)
    }
    else{
      let characterList = ""
      if(includeNumbers){
        characterList = characterList + numbers
      }
      if(includeLowerCase){
        characterList = characterList + lowerCaseLetters
      }
      if(includeUpperCase){
        characterList = characterList + upperCaseLetters
      }
      if(includeSymbols){
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
        notify("password is generate successfully" , true)
    }
  }

  const createPassword = (characterList) => {
    let password=""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password  
  }

  const handleCopyPassword = (e) =>{
    if(password === ""){
      notify(COPY_FAIL, true)
    }
    else{
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }
  }

  const copyToClipboard = (password) =>{
    navigator.clipboard.writeText(password)
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator__header'>
            Password Generator
          </h2>
          <div className='generator__password'>
            <h3>{password}</h3>
            <button className='copy__btn'>
              <i onClick={handleCopyPassword} className='far fa-clipboard'></i>
            </button>
          </div>
          <div className='form-group'>
            <label>Password length</label>
            <input className='pw' defaultValue={passwordLength} onChange={(e) => e.target.value} type='number' id="password-stregth" name="password-strength" max="26" min="8" />
          </div>
          <div className='form-group'>
            <label>Add Uppercase Letters</label>
            <input checked={includeUpperCase} onChange={(e) => e.target.value} type="checkbox" id='uppercase-letters' name='uppercase-letters'/>
          </div>
          <div className='form-group'>
            <label>Add lowercase letters</label>         
            <input checked={includeLowerCase} onChange={(e) => e.target.value} type="checkbox" id='lowercase-letters' name='lowercase-letters'/>
          </div>
          <div className='form-group'>
            <label>Include Number</label>
            <input checked={includeNumbers} onChange={(e) => e.target.value} type='checkbox' name='include-numbers' id='include-letters'></input>
          </div>
          <div className='form-group'>
            <label>Include Symbols</label>
            <input checked={includeSymbols} onChange={(e) => e.target.value} type='checkbox' name='include-numbers' id='include-letters'></input>
          </div>
          <button onClick={handleGeneratePassword} className='generator__btn'>
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
        </div>
      </div>     
    </div>
  )
}

export default App
