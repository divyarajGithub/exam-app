import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { examViewFailure, examViewSucess, fetchExamViewRequest } from '../../Redux/view_exam/view_exam_action';
import Header from '../TeacherDashBord/Header';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import './viewExam.css'

export const ViewExam = ({onEditExamHandler}) => {
    const [loading ,setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.useViewExamReducer)
    console.log("this is form the use selector hook", data)
    // console.log("this is the data from the use selector hook another console", data.data)
    const fetchIntialData = () => {
        setLoading(true)
        axios.get(`https://examination.onrender.com/dashboard/Teachers/viewExam`, {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("this is the response from the view exam request", response.data.data)
            dispatch(examViewSucess(response.data))
            setLoading(false)
        }).catch((error) => {
            dispatch(examViewFailure(error))
            setLoading(false)
        })
    }
    useEffect(() => {
        dispatch(fetchExamViewRequest())
        fetchIntialData();
    }, [])
    const onDeleteHandler = (id)=>{
        axios.delete(`https://examination.onrender.com/dashboard/Teachers/deleteExam?id=${id}`,{
          headers:{
            "access-token" : localStorage.getItem("token")
          }
        })
        .then((response)=>{
          console.log("delete exam sucess" , response)
        }).catch((error)=>{
          console.log("error in delete exam" ,error )
        })
    }
    
    return (
        <>
        <Header/>
        {
            loading ? (
                <Box sx={{ display: 'flex' , justifyContent:'center' ,alignItems:'center' , height:'100vh'}}>
                  <CircularProgress />
                </Box>
              ): <div>
              <table className="table">
                  <thead className="thead-dark">
                      <tr>
                          <th scope="col">Subject Name</th>
                          <th scope="col">Email</th>
                          <th scope='col'>Exam Details</th>
                          <th scope='col'>Delete</th>
                          <th scope='col'>Edit exam</th>
                          
                       
                      </tr>
                  </thead>
                  <tbody>
                      {
                          data?.data?.data?.map((data , index)=>{
                            console.log("data>>>viewExam>>.",data)
                            console.log("subjectNotes>>>" , data.notes)
                              return(
                                  <tr key={index}>
                                      <td>{data.subjectName}</td>
                                      <td>{data.email}</td>
                                      <td><Link to={`/teacherDashBord/viewExam/viewExamDetail/${data._id}`}><button className='btn btn-primary'>View Exam Details</button></Link></td>
                                      <td><button onClick={()=>onDeleteHandler(data._id)} className='btn btn-danger'>Delete</button></td>
                                      {/* <td><button onClick={()=>dispatch(onEditClick({subjectName : data.subjectName , notes :data.notes}))}><Link to={`/teacherDashBord/viewExam/editExam/${data._id}`}>Edit</Link></button></td> */}
                                      <td><Link  to={`/teacherDashBord/viewExam/editExam/${data._id}`} className='Link-color'><button onClick={()=>onEditExamHandler({subjectName : data.subjectName , notes : data.notes})} className='btn btn-primary'>Edit</button></Link></td>
                                  </tr>
                              )
                          })
                      } 
                         
                  </tbody>
              </table>
  
           
          </div>
        }
       
        </>
    )
}
