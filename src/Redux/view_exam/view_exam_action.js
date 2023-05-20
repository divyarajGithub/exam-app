import { FETCH_EXAM_FAILURE, FETCH_EXAM_REQUEST, FETCH_EXAM_SUCCESS } from "./view_exam_type"


export const fetchExamViewRequest = ()=>{
    return {
        type: FETCH_EXAM_REQUEST
    }
}

export const examViewSucess = (data)=>{
    return {
        type : FETCH_EXAM_SUCCESS,
        payload : data
    }
}

export const examViewFailure = (error)=>{
    return{
        type : FETCH_EXAM_FAILURE,
        payload : error
    }
}