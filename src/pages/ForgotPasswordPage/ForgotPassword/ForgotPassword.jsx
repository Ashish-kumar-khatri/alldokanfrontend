import React,{
	useState
} from 'react'
import {
	TextInput,
	Button
} from '@mantine/core';
import { Icon } from '@iconify/react';

import './ForgotPassword.css'

function ForgotPassword(){

	const [submitting,setSubmitting] = useState(false);

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
			<form action="">
				<TextInput 
					label = "email"
					size = "md"
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
					size = "md"
					loading = {submitting}
				>
					Send further instruction
				</Button>
			</form>
		</div>
	)

}

export default ForgotPassword;
