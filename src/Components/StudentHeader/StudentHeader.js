import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const StudentHeader = () => {
    const navigate = useNavigate ();
    const avtarClickHandler = ()=>{
        console.log("avtar handler is clicked");
        navigate('/studentDashBord/studentProfile');
    }

    const logoutHandler = (e)=>{
        
        e.preventDefault();
        navigate('/sign-in')
        localStorage.clear();
    }
        
    return (
        <div>
            <nav className='navbar'>
                <div>
                    <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"  onClick={avtarClickHandler}/>
                </div>
                <div className='flex'>
                    <li className='liItems'><Link className='linkStyle' to="/studentDashBord/viewAllExam">All Exam</Link></li>
                </div>
                <div>
                    <Link to="/sign-in"><Button style={{ marginRight: '1rem' , backgroundColor:'#9BA4B5',fontWeight:'bold'}} variant="contained" onClick={logoutHandler}>Logout</Button></Link>
                    <Link to='/resetPassword'><Button style={{ backgroundColor: '#9BA4B5' ,fontWeight:'bold'}}variant="contained">Reset Password</Button></Link>
                </div>
            </nav>
        </div>
    )
}

export default StudentHeader