import React, { useState } from 'react'
import './TeacherDash.css'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { ResetPasswardForm } from '../ResetPassword/ResetPasswordForm';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


export const TeacherDash = () => {
  return (
    <div>
      <Header/>
    </div>
  )
}
