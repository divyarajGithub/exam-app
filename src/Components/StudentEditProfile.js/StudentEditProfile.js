import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./StudentEditProfile.css"

const StudentEditProfile = () => {
    const navigate = useNavigate()
    const [studentName , setStudentName] = useState("");
    useEffect(()=>{
        console.log("student name inside the useEffect" , studentName)
    })
    const onClickHandler = (e)=>{
        e.preventDefault();
        const payload = {
            name : studentName,
        }
        axios.put(`https://examination.onrender.com/student/studentProfile`,payload,{
            headers : {
                "access-token" : localStorage.getItem("token")
            }
        }).then((response)=>{
            console.log("response from the edited profile",response)
            redirectToStudentProfile()
        }).catch((error)=>{
            console.log("error from the edited profile " , error)
        })
    }
    const redirectToStudentProfile = ()=>{
        setTimeout(()=>{
            navigate("/studentDashBord/studentProfile")
        },2000)
    }


  return (
    <div className='editProfile__container'>
        <div className='nameInput__container'>
            <label>New name : </label>
            <input type='text' placeholder='Enter the new name' onChange={(e)=>setStudentName(e.target.value)}/>
        </div>
        <button onClick={onClickHandler}>Edit profile</button>
    </div>
  )
}

export default StudentEditProfile