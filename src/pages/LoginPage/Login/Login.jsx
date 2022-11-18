import React,{
	useState
} from 'react'
import {
	TextInput,
	Button,
	PasswordInput
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import './Login.css'

function Login(){

	const [submitting,setSubmitting] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
	}

	const changeHandler = (e) => {

	}

	return(
		<div className = "form">
			<form 
				action=""
				onSubmit = {submitHandler}
			>
				<h2 className="title">
					Login to AllDokan
				</h2>
				<TextInput 
					label = "email"
					name = "email"
					onChange = {changeHandler}
					disabled = {submitting}
					size = "md"
				/>
				<PasswordInput 
					label = "password"
					size = "md"
					className = "password"
					disabled = {submitting}
				/>
				<small>
				<Link
					to = "#"
				>forgot password?</Link>
				</small>
				<Button
					leftIcon = {<Icon icon = "fe:login" />}
					loading = {submitting}
					fullWidth
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
        	</form>
		</div>
	)

}

export default Login;
