import { FETCH_ACTIVESTUDENT_FAILURE, FETCH_ACTIVESTUDENT_REQUEST, FETCH_ACTIVESTUDENT_SUCESS } from "./viewActiveStudentConstant"

const initialState = {
    loading :false,
    data : [],
    error : ''
}
export const viewActiveStudentReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_ACTIVESTUDENT_REQUEST : return{
            loading : true,
            data :[],
            error : ''
        }
        case FETCH_ACTIVESTUDENT_SUCESS : return{
            loading : false,
            data :action.payload,
            error : ""
        }
        case FETCH_ACTIVESTUDENT_FAILURE : return{
            loading : false,
            data : [],
            error : action.payload
        }
        default : return state
    }
} 
