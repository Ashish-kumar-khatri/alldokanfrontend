import React,{
	useState
} from 'react'
import {
	TextInput,
	Button
} from '@mantine/core';
import {
	useParams,
	useNavigate
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import Joi from 'joi-browser';
import {emailSchema} from '../../../utils/schemas/schema';
import {getJoiErrorMsg} from '../../../utils/getJoiErrors';

import './ForgotPassword.css'
import { Link } from 'react-router-dom';
import { endpoints } from '../../../utils/endpoints/authEndpoints';
import { useAxios, useCreateNotification } from '../../../hooks';

function ForgotPassword(){

	const [email,setEmail] = useState('')
	const [submitting,setSubmitting] = useState(false);
	const [emailError,setEmailError] = useState("");
	const [validEmail,setValidEmail] = useState(false);

	const axiosInstance = useAxios();
	const {createNotification} = useCreateNotification();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitting');
		setSubmitting(true);
		axiosInstance.post(`${endpoints.forgotPassword}`,{
			email : email})
			.then(res => {
				console.log('res = ',res);
				createNotification({
					title : "reset password",
					type : "success",
					timer : 5000,
					message : res?.data?.message,
					icon : "material-symbols:sms-failed"
				})
				navigate('/login');
				setSubmitting(false);
			})
			.catch(err => {
				console.log(err);
				createNotification({
					title : "reset password",
					type : "failure",
					timer : 5000,
					message : err?.response?.data?.message ? err?.response?.data.message : err?.response?.data,
					icon : "material-symbols:sms-failed"
				})
				setSubmitting(false);

			})

		setTimeout(() => {
			setSubmitting(false);
		},5000)
	}


	const changeHandler = (e) => {
		setEmail(e.target.value)
		const err = getJoiErrorMsg(Joi.validate(e.target.value,emailSchema).error);
		console.log(err);
		if(err){
			setEmailError(err);
			setValidEmail(false);
		}else{
			setEmailError("");
			setValidEmail(true);
		}
	}

	return(
		<div className = "form forgot-password-container">
			<div className="header">
				<h2 className="title">
					Forgot password?
				</h2>
				<p
					className='description'
				>
					Enter the email address you used when you joined and we’ll send you instructions to reset your password.
				</p>
			</div>
			<form action="" onSubmit = {submitHandler}>
				<TextInput 
					label = "email"
					size = "md"
					disabled = {submitting}
					error = {emailError}
					onChange = {changeHandler}
					value = {email}
					autoFocus
				/>
				<Button
					fullWidth
					leftIcon = {<Icon icon = "mdi:notes-outline"/>}
					styles={(theme) => ({
						root : {
							display : "none"
						},
						leftIcon: {
						  marginRight: 20,
						},
					  })}
					type = "submit"
					size = "md"
					loading = {submitting}
					className = {`${!validEmail ? "disabled" : ""}`}
				>
					Send further instruction
				</Button>
				<div className="footer-text">
					<span>
						go back to
					</span>
					<Link to = "/login">login</Link>
				</div>
			</form>
		</div>
	)

}

export default ForgotPassword;
