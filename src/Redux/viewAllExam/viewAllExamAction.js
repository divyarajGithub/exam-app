import { FETCH_ALLEXAM_FAILURE, FETCH_ALLEXAM_REQUEST ,FETCH_ALLEXAM_SUCESS } from "./viewAllExamTypes"


export const fetchAllExamRequest= ()=>{
    return{
        type: FETCH_ALLEXAM_REQUEST
    }
}

export const fetchAllExamSucess = (data)=>{
    return{
        type : FETCH_ALLEXAM_SUCESS,
        payload : data
    }
}

export const fetchAllExamFailure = (data)=>{
    return{
        type : FETCH_ALLEXAM_FAILURE,
        payload : data
    }
}