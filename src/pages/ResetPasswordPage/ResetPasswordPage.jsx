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
import { useParams } from 'react-router-dom';
import { endpoints } from '../../utils/endpoints/authEndpoints';
import axios from 'axios';
import { useCreateNotification } from '../../hooks';

function ResetPasswordPage(){

	const [data,setData] = useState({
		password : "",
		repeat_password : ""
	})

	const [submitting,setSubmitting] = useState(false)

	const [errors,setErrors] = useState({
		password : "",
		repeat_password : ""
	})

	const [valid,setValid] = useState({
		password : "",
		repeat_password : ""
	})

	const {createNotification} = useCreateNotification();

	const {resetToken} = useParams();

	const changeHandler = (e) => {
		setData(prev => ({
			...prev,
			[e.target.name] : e.target.value
		}))
		let error;
		switch(e.target.name){
			case "password":
				error = getJoiErrorMsg(Joi.validate(e.target.value,passwordSchema).error);
				break;
			
			case "repeat_password":
				error = (e.target.value == data.password) ? "" : "password doesnot match";
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
		console.log('submitting',resetToken)
		axios.put(`${endpoints.resetPassword}/${resetToken}`,data)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err)
				createNotification({
					title : "reset password",
					type : "failure",
					timer : 5000,
					message : err?.response?.data?.error,
					icon : "material-symbols:sms-failed"
				})
			})
		setTimeout(() => {
			setSubmitting(false)
		},5000)
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
						name = "password"
						size = "md"
						onChange = {changeHandler}
						error = {errors.password}
					/>
					<PasswordInput 
						label = "repeat new password"
						name = "repeat_password"
						size = "md"
						onChange = {changeHandler}
						error = {errors.repeat_password}
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
