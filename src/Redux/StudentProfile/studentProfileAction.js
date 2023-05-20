import { STUDENT_PROFILE_FAILURE, STUDENT_PROFILE_REQUEST, STUDENT_PROFILE_SUCESS } from "./studentProfileTypes"


export const student_profile_success = (data)=>{
    return{
        type : STUDENT_PROFILE_SUCESS,
        payload : data
    }
}

export const student_profile_request = ()=>{
    return{
        type : STUDENT_PROFILE_REQUEST
    }
}

export const student_profile_failure = (data) =>{
    return{
        type : STUDENT_PROFILE_FAILURE,
        payload : data
    }
}