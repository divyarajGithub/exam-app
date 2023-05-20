import { Navigate } from "react-router-dom"
export const TeacherElement = ({children})=>{
    if(localStorage.getItem("isLoggedIn") && localStorage.getItem("user_role") === "teacher"){
        return children
    }else{
        return <Navigate to="/sign-in" replace={true}/>    }
}
export const StudentElement = ({children})=>{
    if(localStorage.getItem("isLoggedIn") && localStorage.getItem("user_role") === "student"){
        return children
    }else{
        return <Navigate to="/sign-in" replace={true}/>
    }
}