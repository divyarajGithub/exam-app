import React, { useEffect, useState } from 'react'
import './ResetPasswordForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const ResetPasswardForm = ({postData}) => {
    const navigate = useNavigate()
    const [resetPass , setResetPass] = useState(false)
    const[resetFormState , setResetFormState] = useState({
        oldPassword : '',
        Password : '',
        ConfirmPassword : '',
    })

    const onChangeHandler = (event)=>{
        setResetFormState({
            ...resetFormState,
            [event.target.name] : event.target.value
        })
        
    }
    useEffect(()=>{
        console.log(resetFormState);
    },[resetFormState])


    const resetPassSubmitHandler = async(e)=>{
        e.preventDefault()
        axios.post('https://examination.onrender.com/users/ResetPassword' , resetFormState , {
            headers:{
                "access-token" : localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res)
            setResetPass(true)

        })
    }
  return (
    <>
    <div className='container'>
        <form>
            <h2>Reset Password</h2>
            <div>

            <label>oldPassword : </label>
            <input type='text' placeholder='Enter your old password' name='oldPassword' className='inputField' onChange={onChangeHandler}/>
            </div>
            <div>
                <label>New password :</label>
                <input type='text' placeholder='Enter new password' className='inputField' onChange={onChangeHandler} name='Password'/>
            </div>
            <div>
                <label>Confirm password :</label>
                <input type='text' placeholder='Confirm the password' className='inputField' onChange={onChangeHandler} name='ConfirmPassword'/>
            </div>
            <div>
                <button className='passwordResetBtn' onClick={resetPassSubmitHandler}>Submit</button>
            </div>
        </form>
        
    </div>
    {   resetPass && <div className='sucess'>Reset Password succesfully</div>}
    </>
  )
}
