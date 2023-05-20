import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { student_profile_failure, student_profile_request, student_profile_success } from '../../Redux/StudentProfile/studentProfileAction'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './StudentProfile.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const StudentProfile = () => {

    let navigate = useNavigate()
    const data = useSelector(state => state.studentProfileReducer);
    console.log("data useSelector studentProfile>>>>>", data.loading)
    if (data?.data?.data?.statusCode === 401) {
        navigate("/sign-in")
    }
    const dispatch = useDispatch()
    const fetchInitalDetails = () => {
        dispatch(student_profile_request())
        axios.get(`https://examination.onrender.com/student/getStudentDetail`, {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            dispatch(student_profile_success(response))
        }).catch((error) => {
            dispatch(student_profile_failure(error))
        })
    }
    useEffect(() => {
        fetchInitalDetails();
    }, [])

    return (
        <>
            {
                data?.loading ? (<Box sx={{ display: 'flex' ,justifyContent:'center' , alignItems:'center' , height:'100vh'}}>
                    <CircularProgress />
                </Box>) :
                    <div className='profile__container'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnmKYTYqxRSzIUqL6SlpV63hHsmWS1s_lDo6TejgOrw&usqp=CAU&ec=48665698' />
                        <div>Name : {data?.data?.data?.data?.name} </div>
                        <div>Email : {data?.data?.data?.data?.email}</div>
                        <Link to="/studentDashBord/editProfile"><button>Edit Profile</button></Link>
                    </div>
            }
        </>
    )
}

export default StudentProfile