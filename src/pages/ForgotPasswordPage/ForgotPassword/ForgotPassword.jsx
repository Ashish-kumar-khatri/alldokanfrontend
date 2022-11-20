import React,{
	useState
} from 'react'
import {
	TextInput,
	Button
} from '@mantine/core';
import {
	useParams
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import Joi from 'joi-browser';
import {emailSchema} from '../../../utils/schemas/schema';
import {getJoiErrorMsg} from '../../../utils/getJoiErrors';

import './ForgotPassword.css'
import { Link } from 'react-router-dom';

function ForgotPassword(){

	const [submitting,setSubmitting] = useState(false);
	const [emailError,setEmailError] = useState("");
	const [validEmail,setValidEmail] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitting');
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
		},5000)
	}


	const changeHandler = (e) => {
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
					disabled = {!validEmail}
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
