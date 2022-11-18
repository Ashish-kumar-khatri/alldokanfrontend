import React,{
  useState
} from 'react'


import {
  AuthInfoLeft,
  AuthNav,
  Logo
} from '../../components/';

import Login from './Login/Login';

import Illustration from '../../assets/auth.svg'

import { emailSchema } from '../../utils/schemas/schema';
import Joi from 'joi-browser';

import './LoginPage.css';



function LoginPage() {
    
    const [errors,setErrors] = useState({});
    // const [submitting,setSubmitting] = useState(false);

    // const submitHandler = (e) => {
    //   e.preventDefault();
    //   setSubmitting(true);
    //   console.log('submitting')
    // }

    // const changeHandler = (e) => {
    //   switch(e.target.name){
    //     case "email":
    //       console.log('email change handeler');
    //       console.log(Joi.validate(e.target.value,emailSchema).error?.message)

    //   }
    // }

    return (
      <>
      {/* <AuthNav /> */}
      {/* <AuthNav /> */}
      <div 
        className = "auth-container login"
      >
        <AuthInfoLeft>
            <Logo />
            <img className = "illustration" src={Illustration} alt="" />
        </AuthInfoLeft>
        <Login />
      </div>
      </>
    )
}

export default LoginPage