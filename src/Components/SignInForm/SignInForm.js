import React, { useState } from 'react'
import './SignInForm.css' 
import { Link } from 'react-router-dom'

const SignInForm = ({onSignInHandler}) => {
    const[signInFormData , setSignInFormData] = useState({
        email :'',
        password : ''
    })
    const onChangeHandler = (event)=>{
        setSignInFormData({
            ...signInFormData ,
            [event.target.name] : event.target.value
        })
    }
    const onLoginHandler = (e)=>{
        e.preventDefault();
        onSignInHandler(signInFormData)
    }
    return (
        <div className='signInContainer'>
            <form >
                <h2>Sign In</h2>
                <div>
                    <label>Email :</label>
                    <input type='email'  name='email' placeholder='Enter your email' className='inputField' onChange={onChangeHandler} />
                </div>
                <div>
                    <label>Password :</label>
                    <input type='password' name="password" className='inputField' placeholder='Enter your password' onChange={onChangeHandler}/>
                </div>
                <div>
                    <button className='signInBtn' onClick={onLoginHandler}>Login</button>
                </div>
                <div className='forgetPassword'>
                    <Link to="/forgetPassword">Forget Password ?</Link>
                </div>
            </form>
        </div>
    )
}

export default SignInForm