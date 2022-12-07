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
import './LoginPage.css';

function LoginPage() {

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