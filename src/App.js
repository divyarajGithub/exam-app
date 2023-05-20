import { useEffect, useState } from "react";
import SignUp from "./Components/SignUpForm/SignUp";
import axios from 'axios'
import { Routes, Route, Link, useNavigate, useRoutes } from 'react-router-dom'
import SignInForm from "./Components/SignInForm/SignInForm";
import { TeacherDash } from "./Components/TeacherDashBord/TeacherDash";
import { ForgetPassword } from "./Components/ForgetPassword/ForgetPassword";
import { ResetPasswardForm } from "./Components/ResetPassword/ResetPasswordForm";
import { NewPassword } from "./Components/NewPassword/NewPassword";
// import CreateExamComponent from "./Components/CreateExam/CreateExamComponent";
import { ActiveStudent } from "./Components/ActiveStudent/ActiveStudent";
import NotFound from "./Components/No match/NotFound";
import StudentTable from "./Components/StudentDataTable.js/StudentTable";
import { ViewExam } from "./Components/ViewExam/ViewExam";
import CreateExamFinal from "./Components/CreateExam/CreateExamFinal";
import ShowStudentDetails from "./Components/ShowStudentDetails/ShowStudentDetails";
import ViewExamDetail from "./Components/ViewExamDetail/ViewExamDetail";
import StudentDash from "./Components/StudentDashBord/StudentDash";
import ViewAllExam from "./Components/ViewAllExam/ViewAllExam";
import { GiveExam } from "./Components/GiveExam/GiveExam";
import { EditExam } from "./Components/EditExam/EditExam";
import StudentProfile from "./Components/StudentProfile/StudentProfile";
import StudentEditProfile from "./Components/StudentEditProfile.js/StudentEditProfile";
import { TeacherElement } from "./auth";
import { StudentElement } from "./auth";

function App() {
  const [verifyEmailFlag, setVerifyEmailFlag] = useState(false);
  const [signInData, setSignInData] = useState({})
  const [editExamData, setEditExamData] = useState({
    subjecName: "",
    notes: ''
  })

  const navigate = useNavigate();

  const onSignUpHandler = async (data) => {
    const response = await postData('https://examination.onrender.com/users/SignUp', data);
    console.log("this is the signUP response :", response)
    setVerifyEmailFlag(true)
  }

  const onSignInHandler = async (data) => {
    console.log("signIn data", data)
    const response = await postData(`https://examination.onrender.com/users/Login`, data)
    let token = response?.data?.data?.token
    localStorage.setItem('token', token)
    let role = response?.data?.data?.role;
    setSignInData({ ...response })
    localStorage.setItem('user_role', String(role))
    localStorage.setItem('isLoggedIn', true)
  }

  useEffect(() => {
    console.log("login token", localStorage.getItem('token'))
  },)
  useEffect(() => {
    console.log(signInData)
    console.log("this is role inside useEffect", signInData?.data?.data?.role)
    let currentRole = signInData?.data?.data?.role
    if (currentRole === 'student') {
      navigate('/studentDashBord')
    } else if (currentRole === 'teacher') {
      navigate('/teacherDashBord')
    }
  }, [signInData])

  const postData = async (url, data) => {
    return await axios.post(url, data)
  }

  const onEditExamHandler = (data) => {
    setEditExamData({
      subjectName: data.subjectName,
      notes: [...data.notes]
    })
  }
  useEffect(() => {
    console.log(editExamData)
  }, [editExamData])

  
  let element = useRoutes([
    {
      path: "/newPassword",
      element: <NewPassword postData={postData} />
    },
    {
      path: "/resetPassword",
      element: <ResetPasswardForm postData={postData} />
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword postData={postData} />
    },
    {
      path: "teacherDashBord",
      element: <TeacherElement><TeacherDash postData={postData} /></TeacherElement>
    },
    {
      path: "/",
      element: <SignUp onSignUpHandler={onSignUpHandler} verifyEmailFlag={verifyEmailFlag} />
    },
    {
      path: "/sign-in",
      element: <SignInForm onSignInHandler={onSignInHandler} />
    },
    {
      path: "/studentDashBord",
      element: <StudentElement>< StudentDash /></StudentElement>
    },
    {
      path: "teacherDashBord/showAllStudent",
      element: <TeacherElement><StudentTable /></TeacherElement>
    },
    {
      path: "teacherDashBord/createExamComponent",
      element: <TeacherElement><CreateExamFinal /></TeacherElement>
    },
    {
      path: "teacherDashBord/activeStudent",
      element: <TeacherElement><ActiveStudent /></TeacherElement>
    },
    {
      path: "teacherDashBord/activeStudent/showStudentDetail/:_id",
      element: <TeacherElement><ShowStudentDetails /></TeacherElement>
    },
    {
      path: "teacherDashBord/viewExam",
      element: <TeacherElement><ViewExam onEditExamHandler={onEditExamHandler} /></TeacherElement>
    },
    {
      path: "teacherDashBord/viewExam/viewExamDetail/:_id",
      element: <TeacherElement><ViewExamDetail /></TeacherElement>
    },
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/studentDashBord/viewAllExam",
      element: <StudentElement><ViewAllExam /></StudentElement>
    },
    {
      path: "/studentDashBord/viewAllExam/giveExam/:id",
      element: <StudentElement><GiveExam /></StudentElement>
    },
    {
      path: "/teacherDashBord/viewExam/editExam/:_id",
      element: <TeacherElement><EditExam editExamData={editExamData} /></TeacherElement>
    },
    {
      path: "/studentDashBord/studentProfile",
      element: <StudentElement><StudentProfile /></StudentElement>
    },
    {
      path: "/studentDashBord/editProfile",
      element: <StudentElement><StudentEditProfile /></StudentElement>
    }
  ])
  return element
  
  // return (
  //   <div>
  //     <Routes>
  //       {/* <Route path="/newPassword" element={<NewPassword postData={postData} />} />
  //       <Route path="/resetPassword" element={<ResetPasswardForm postData={postData} />} />
  //       <Route path="/forgetPassword" element={<ForgetPassword postData={postData} />} />
  //       <Route path="teacherDashBord" element= {<TeacherElement><TeacherDash postData={postData} /></TeacherElement>}/>
  //       <Route path="/" element={<SignUp onSignUpHandler={onSignUpHandler}  verifyEmailFlag={verifyEmailFlag}/>} />
  //       <Route path="/sign-in" element={<SignInForm onSignInHandler={onSignInHandler} />} />
  //       <Route path="/studentDashBord" element={<StudentElement>< StudentDash/></StudentElement>}/>
  //       <Route path="teacherDashBord/showAllStudent" element={<TeacherElement><StudentTable/></TeacherElement>} />
  //       <Route path="teacherDashBord/createExamComponent" element={<TeacherElement><CreateExamFinal /></TeacherElement>} />
  //       <Route path="teacherDashBord/activeStudent" element={<TeacherElement><ActiveStudent /></TeacherElement>}>
  //       </Route>
  //       <Route path="teacherDashBord/activeStudent/showStudentDetail/:_id" element={<TeacherElement><ShowStudentDetails/></TeacherElement>}/>
  //       <Route path="teacherDashBord/viewExam" element={<TeacherElement><ViewExam onEditExamHandler={onEditExamHandler}/></TeacherElement>}/>
  //       <Route path="teacherDashBord/viewExam/viewExamDetail/:_id" element={<TeacherElement><ViewExamDetail/></TeacherElement>}/>
  //       <Route path="*" element={<NotFound />} /> 
  //       <Route path="/studentDashBord/viewAllExam" element={<StudentElement><ViewAllExam/></StudentElement>}/>
  //       <Route path="/studentDashBord/viewAllExam/giveExam/:id" element={<StudentElement><GiveExam/></StudentElement>}/> 
  //       <Route path="/teacherDashBord/viewExam/editExam/:_id" element={<TeacherElement><EditExam editExamData={editExamData}/></TeacherElement>}/>
  //       <Route path="/studentDashBord/studentProfile" element={<StudentElement><StudentProfile/></StudentElement>}/>
  //       <Route path="/studentDashBord/editProfile" element={<StudentElement><StudentEditProfile/></StudentElement>}/> */}

  //       {
  //         routes.map((route , index)=>{
  //           return(
  //             <Route key={index} path={route.path} element={route.element} />
  //           )
  //         })
  //       } 
  //     </Routes>
  //   </div>

  // )
}

export default App;
