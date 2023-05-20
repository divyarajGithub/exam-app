import { FETCH_ALLEXAM_REQUEST, FETCH_ALLEXAM_SUCESS , FETCH_ALLEXAM_FAILURE } from "./viewAllExamTypes"
    

const initialState = {
    loading :'',
    data : [],
    error :'',
}

export const viewAllExamReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_ALLEXAM_REQUEST : return{
            ...state,
            loading : true,
            
        }
        case FETCH_ALLEXAM_SUCESS : return{
            loading : false , 
            data : action.payload,
            error : ""
        }
        case FETCH_ALLEXAM_FAILURE : return{
            loading : false,
            data : [],
            error : action.payload
        }
        default : return state
    }
}