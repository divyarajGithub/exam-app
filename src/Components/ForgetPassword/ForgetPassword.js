import React, { useState } from 'react'
import './ForgetPassword.css'

export const ForgetPassword = ({postData}) => {
  const[email , SetEmail] = useState();
  const[flag , setFlag] = useState(false)
  const onChangeEmailHanlder = (event)=>{
    SetEmail(event.target.value)
  }
  const onClickHandler = async(event)=>{
    event.preventDefault();
    const response = await postData('https://examination.onrender.com/users/ForgotPassword',{email})
    console.log(response)
  }
  console.log(email)
  return (
    <div className='forgetPasswordMailContainer'>
        <form>
            <div>

            <label>Email :</label>
            <input className='inputField' type='email' placeholder='Please enter your email' onChange={onChangeEmailHanlder}/>
            </div>
            <div>
                <button className='submitBtn' onClick={onClickHandler}>Submit</button>
            </div>
        </form>
        
    </div>
  )
}
