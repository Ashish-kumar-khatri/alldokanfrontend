import React,{
	useState
} from 'react'

import {
	AuthNav,
	AuthInfoLeft,
	Logo
} from '../../components/';
import Register from './Register/Register';
import Otp from './Otp/Otp';

import {
	Routes,
	Route,
	Navigate
} from 'react-router-dom';

import Illustration from '../../assets/auth.svg';

import './RegisterPage.css'


function RegisterPage(){

	return(
		<>
		{/* <AuthNav /> */}
		<div 
		  className = "auth-container register"
		>
			<Routes>
		  		<Route path = "" element = {
					<>
						<AuthInfoLeft>
							<Logo />
							<img className = "illustration" src={Illustration} alt="" />
						</AuthInfoLeft>
						<Register />
					</>
				} />
				<Route path = "/otp" element = {
					<>
						<AuthInfoLeft>
							<Logo />
							<img className = "illustration" src={Illustration} alt="" />
						</AuthInfoLeft>
						<Otp />
					</>
				}/>
			</Routes>
		</div>
		</>
	)
}

export default RegisterPage;
