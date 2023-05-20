import React, { useEffect, useState, useSyncExternalStore } from 'react'
import './NewPassword.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const NewPassword = ({postData}) => {
    const navigate = useNavigate()
    const[sucessMessage , SetSucessMessage] = useState(false);
    const [newpass , Setnewpass] = useState({
        Password : '',
        ConfirmPassword : ''
    })
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const[validToken , setValidToken] = useState(false);
  

    useEffect(()=>{
        const verifyToken = async()=>{
            try{
                const response = await axios.get(`https://examination.onrender.com/users/newPassword`,{
                    headers : {
                        "access-token" : token
                    }
                })
                setValidToken(true)
                console.log(token)
                console.log("token validation sucessfull and this is response from it" , response);
                if(response.data.data.statusCode === 200){
                    redirectToSingIn();
                }
            }catch{
                console.log("some error is occured")
                setValidToken(false)
            }
        }
        verifyToken();
    },[token])

    const onNewPasswordSubmitHandler = async(event)=>{
        event.preventDefault()
        console.log("onNewPassword sumbit handler is called")
        const response = await postData(`https://examination.onrender.com/users/ForgotPassword/Verify?token=${token}`, newpass)
        console.log(response)
        SetSucessMessage(true)
    }
    const onChangeHandler = (event)=>{
        Setnewpass({
            ...newpass,
            [event.target.name] : event.target.value
        })
    }
    const redirectToSingIn = ()=>{
        setTimeout(()=>{
            navigate('/sign-In')
        },2000)
    }
    useEffect(()=>{
        console.log(newpass)
    },[newpass])

  return (
    <>
    { validToken && 

    <div className='container'>
        <form>
            <h2>New password</h2>
            <div>
                <label>New Password :</label>
                <input type='text' name='Password' placeholder='Enter your new password' className='inputField' onChange={onChangeHandler}/>
            </div>
            <div>
                <label>Confirm password :</label>
                <input type='text' name='ConfirmPassword' placeholder='Confirm new password' className='inputField' onChange={onChangeHandler}/>
            </div>
            <div>
                <button className='newPassBtn' onClick={onNewPasswordSubmitHandler}>Submit</button>
            </div>
        </form>
    </div>
    }
    {
        sucessMessage &&<div className='sucessMessage'>New Password Generated Sucessfully</div>
    }
    </>
  )
}
