import React,{
	useState
} from 'react'

import {
	AuthNav,
	AuthInfoLeft,
	Logo
} from '../../components/';
import Register from './Register/Register';

import Illustration from '../../assets/auth.svg';

import './RegisterPage.css'


function RegisterPage(){

	return(
		<>
		{/* <AuthNav /> */}
		<div 
		  className = "auth-container register"
		>
			<AuthInfoLeft>
				<Logo />
				<img className = "illustration" src={Illustration} alt="" />
			</AuthInfoLeft>
		  	<Register />
		</div>
		</>
	)
}

export default RegisterPage;
