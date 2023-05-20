import React, { useState } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'

const SignUp = ({ onSignUpHandler ,verifyEmailFlag }) => {
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    })
    const onChangeHandler = (event) => {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
        console.log(signupData)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSignUpHandler(signupData)
    }
    return (
        <>
     
        <div className='container'>
            <h3>SignUp</h3>
            <form >
                <div>
                    <label>Name : </label>
                    <input className='inputFields' value={signupData.name} type='text' name='name' placeholder='Enter your name' onChange={onChangeHandler} />
                </div>
                <div>
                    <label>Email : </label>
                    <input className='inputFields' value={signupData.email} type='email' name='email' placeholder='Enter your email' onChange={onChangeHandler} />
                </div>
                <div>
                    <label>Password :</label>
                    <input className='inputFields' value={signupData.password} type='password' name='password' placeholder='Enter your password' onChange={onChangeHandler} />
                </div>
                <div>
                    <label>Role :</label>
                    <select className='inputFields roleDesign' name='role' onChange={onChangeHandler} defaultValue={signupData.role}>
                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>
                    </select>
                </div>
                <div>
                    <button className='signupBtn' onClick={onSubmitHandler}>Submit</button>
                </div>
                <div className='loginText'>
                    <span >Already Registered ? <Link to='/sign-in'>Login</Link> </span>

                </div>
            </form>
        </div>
            {
                verifyEmailFlag && <div className='verifyEmail'>SignUp Sucessfull !!Please verify your Email before login</div>
            }
        </>
    )
}

export default SignUp