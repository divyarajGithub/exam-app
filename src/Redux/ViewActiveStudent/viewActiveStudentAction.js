import { FETCH_ACTIVESTUDENT_FAILURE, FETCH_ACTIVESTUDENT_REQUEST, FETCH_ACTIVESTUDENT_SUCESS } from "./viewActiveStudentConstant"

export const fetchActiveStudentRequest = ()=>{
    return{
        type:FETCH_ACTIVESTUDENT_REQUEST,
    }

}

export const fetchActiveStudentSucess = (data)=>{
    return{
        type: FETCH_ACTIVESTUDENT_SUCESS,
        payload : data
    }
}

export const fetchActiveStudentFailure = (error)=>{
    return{
        type : FETCH_ACTIVESTUDENT_FAILURE,
        payload : error
    }
}