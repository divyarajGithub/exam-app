import { STUDENT_PROFILE_FAILURE, STUDENT_PROFILE_REQUEST, STUDENT_PROFILE_SUCESS } from "./studentProfileTypes"

const initialState = {
    data : [],
    error : "",
    loading : ""
}
export const studentProfileReducer = (state = initialState , action)=>{
    switch(action.type){
        case STUDENT_PROFILE_REQUEST : return{
            ...initialState,
            data : [],
            error : "",
            loading : true,
        }
        case STUDENT_PROFILE_SUCESS : return{
            ...initialState,
            data : action.payload,
            error : "",
            loading : false,

        }
        case STUDENT_PROFILE_FAILURE : return{
            ...initialState,
            data :[],
            error : action.payload,
            loading : false
        }
        default : return state
    }

}