import { FETCH_EXAM_FAILURE, FETCH_EXAM_REQUEST, FETCH_EXAM_SUCCESS } from "./view_exam_type"


const initialState = {
    flag:false,
    loading : false,
    data : [],
    error : ''
}

export const useViewExamReducer = (state = initialState ,action)=>{
    switch(action.type){
        case FETCH_EXAM_REQUEST : return{
            ...initialState,
            loading : true
        }
        case FETCH_EXAM_SUCCESS : return{
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_EXAM_FAILURE : return{
            loading : false,
            data : [],
            error : action.payload
        }
        default : return state
    }
}