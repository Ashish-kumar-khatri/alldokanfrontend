import React,{
	useEffect,
	useState
} from 'react'
import {
	TextInput,
	Button,
	PasswordInput
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
	useAuth,
	useAuthContext,
	useCreateNotification
} from '../../../hooks/';

import { emailSchema } from '../../../utils/schemas/schema'
import Joi from 'joi-browser';
import {getJoiErrorMsg} from '../../../utils/getJoiErrors';

import './Login.css'

function Login(){

	const [data,setData] = useState({
		email : "",
		password : ""
	})

	const [errorOccured,setErrorOccured] = useState("");

	const [submitting,setSubmitting] = useState(false);

	const [emailValid,setEmailValid] = useState(false);
	const [emailError,setEmailError] = useState("");
	
	const {login} = useAuth();
	const location = useLocation();
	const {createNotification} = useCreateNotification();

	const navigate = useNavigate();
	
	const submitHandler = (e) => {
	e.preventDefault();
	setSubmitting(true);
	console.log('submitting',data)
	login(data)
		.then(res => {
			createNotification({
				title : "login",
				type : "success",
				timer : 5000,
				message : "logged in successfully",
				icon : "clarity:success-standard-solid"
			})
			navigate('/');
		})
		.catch(err => {
			const error = err?.response?.data?.error;
			setErrorOccured("error occured");
			createNotification({
				title : "login",
				type : "failure",
				timer : 5000,
				message : error,
				icon : "material-symbols:sms-failed"
			})
			setSubmitting(false);
		})
	}

	const changeHandler = (e) => {
		setErrorOccured("");
		setData(prev => (
			{
				...prev,
				[e.target.name] : e.target.value
			}
		))
	let error;
	switch(e.target.name){
		case "email":
			error = getJoiErrorMsg(Joi.validate(e.target.value,emailSchema).error);
			break;
	}
	
	if(error){
			setEmailValid(false);
			setEmailError(error);
		}else{
			setEmailValid(true);
			setEmailError("")
		}
	}

	return(
		<div className = "form">
			<form
				action=""
				onSubmit = {submitHandler}
			>
				<div className="header">
					<h2 className="title">
						Login to AllDokan
					</h2>
					<p>
						Enter the email address you used when you joined and we’ll send you instructions to reset your password.
					</p>
				</div>
				<TextInput 
					label = "email"
					name = "email"
					disabled = {submitting}
					size = "md"
					onChange = {changeHandler}
					error = {emailError || errorOccured}
					autoFocus
				/>
				<PasswordInput 
					onChange = {changeHandler}
					label = "password"
					size = "md"
					className = "password"
					name = "password"
					disabled = {submitting}
					error = {errorOccured}
				/>
				<small>
				<Link
					to = "/forgot-password"
				>forgot password?</Link>
				</small>
				<Button
					leftIcon = {<Icon icon = "fe:login" />}
					loading = {submitting}
					fullWidth
					className = {`${!emailValid ? "disabled" : ""}`}
					styles = {(theme) => ({
						root : {
						height : 43
						}
					})}
					type = "submit"
				>
				{
					!submitting ?
					"Log in to account" :
					"logging in"
				}
				</Button>
				<div className="footer-text">
					<span>
						Don't have account?
					</span>
					<Link
						to = "/register"
					>
						Register
					</Link>
				</div>
				<div className="footer-text">
					<span>
						Not verified yet?
					</span>
					<a
						href = "#"
						className = "center"
						onClick = {(e) => {
							e.preventDefault();
							navigate('/otp-verify',{state : {from : location.pathname}});
						}}
					>
						verify now
					</a>
				</div>
				
        	</form>
		</div>
	)

}

export default Login;
