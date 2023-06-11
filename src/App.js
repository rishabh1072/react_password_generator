import './App.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { COPY_FAIL, COPY_SUCCESS} from './message';

const App = () => {

  const[password, setPassword]=useState("copy password")

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
          </div>
          <div className='form-group'>
            <label>Add Uppercase Letters</label>
          </div>
          <div className='form-group'>
            <label>Add lowercase letters</label>
          </div>
          <div className='forlafjm-group'>
            <label>Include Number</label>
          </div>
          <div className='form-group'>
            <label>Include Symbols</label>
          </div>
          <button>
            Generate Password
          </button>
        </div>
      </div>     
    </div>
  );
}
}
export default App
