import React,{
	useState
} from 'react'
import Joi from 'joi-browser';

import './ResetPasswordPage.css'
import {
	AuthInfoLeft,
	Logo
} from '../../components/';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import {passwordSchema} from '../../utils/schemas/schema';
import {getJoiErrorMsg} from '../../utils/getJoiErrors';


function ResetPasswordPage(){

	const [data,setData] = useState({
		password1 : "",
		password2 : ""
	})

	const [submitting,setSubmitting] = useState(false)

	const [errors,setErrors] = useState({
		password1 : "",
		password2 : ""
	})

	const [valid,setValid] = useState({
		password1 : "",
		password2 : ""
	})

	const changeHandler = (e) => {
		setData(prev => ({
			...prev,
			[e.target.name] : e.target.value
		}))
		let error;
		switch(e.target.name){
			case "password1":
				error = getJoiErrorMsg(Joi.validate(e.target.value,passwordSchema).error);
				break;
			
			case "password2":
				error = (e.target.value == data.password1) ? "" : "password doesnot match";
				break;
		}
		if(error){
			setErrors(prev => (
				{
					...prev,
					[e.target.name] : error
				}
			))
			setValid(prev => ({
				...prev,
				[e.target.name] : false
			}))
		}else{
			setErrors(prev => ({
				...prev,
				[e.target.name] : ""
			}))
			setValid(prev => ({
				...prev,
				[e.target.name] : true
			}))
		}

	}

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitting')
	}

	return(
		<div className = "auth-container reset-password">
			<AuthInfoLeft>
				<Logo />
			</AuthInfoLeft>
			<div className="form">
				<form action="">
					<div className="header">
						<h2 className="title">
							Reset password
						</h2>
						<p>
							Enter the email address you used when you joined and we’ll send you instructions to reset your password.
						</p>
					</div>
					<PasswordInput 
						label = "new password"
						name = "password1"
						size = "md"
						onChange = {changeHandler}
						error = {errors.password1}
					/>
					<PasswordInput 
						label = "repeat new password"
						name = "password2"
						size = "md"
						onChange = {changeHandler}
						error = {errors.password2}
					/>
					<Button
						size = "md"
						// disabled = {!(valid.password1 && valid.password2)}
						loading = {submitting}
						onClick = {submitHandler}
					>
						Reset Password
					</Button>
				</form>
			</div>
		</div>
	)
}

export default ResetPasswordPage;
