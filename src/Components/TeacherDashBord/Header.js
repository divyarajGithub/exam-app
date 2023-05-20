import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './Header.css'



const Header = () => {
    const navigate = useNavigate();
    const logoutHandler = (e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate('/sign-in')
    }
    
    return (
        <div>
            <nav className='navbar'>
                <div>
                    <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
                </div>
                <div className='flex'>
                    {/* <li className='liItems' onClick={getAllStudentData}>Show All Student Data</li> */}
                    <li className='liItems'><Link className='linkStyle' to="/teacherDashBord/showAllStudent">Show All Student Data</Link></li>
                    {/* <li className='liItems' onClick={createExamClickHandler}>Create Exam</li> */}
                    <li className='liItems'><Link className='linkStyle' to='/teacherDashBord/createExamComponent'>Create Exam</Link></li>
                    {/* <li className='liItems' onClick={onViewExamHandler}>View Exam</li> */}
                    <li className='liItems'><Link className='linkStyle' to='/teacherDashBord/viewExam'>View Exam</Link></li>
                    
                    <li className='liItems'><Link className='linkStyle' to='/teacherDashBord/activeStudent'>Active Students</Link></li>

                </div>
                <div>
                    <Button style={{ marginRight: '1rem' , backgroundColor:'#9BA4B5',fontWeight:'bold'}} variant="contained" onClick={logoutHandler}>Logout</Button>
                    
                    <Link to='/resetPassword'><Button style={{ backgroundColor: '#9BA4B5' ,fontWeight:'bold'}}variant="contained">Reset Password</Button></Link>
                </div>
            </nav>
        </div>
    )
}

export default Header