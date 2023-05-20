import  {combineReducers} from 'redux'
import { viewActiveStudentReducer } from "./ViewActiveStudent/activeStudentReducer";
import { useViewExamReducer } from "./view_exam/view_exam_reducer";
import { viewAllExamReducer } from "./viewAllExam/viewAllExamReducer";
import { studentProfileReducer } from './StudentProfile/studentProfileReducer';



export const rootReducer = combineReducers({
    viewAllExamReducer : viewAllExamReducer,
    activeStudentReducer : viewActiveStudentReducer,
    useViewExamReducer : useViewExamReducer,
    studentProfileReducer : studentProfileReducer,
})