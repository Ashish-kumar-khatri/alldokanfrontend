import { Button, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import './Otp.css'

import {
	useNavigate
} from 'react-router-dom';
import { useAuth, useAuthContext, useCreateNotification, useGlobalContext } from '../../../hooks';
import { endpoints } from '../../../utils/endpoints/authEndpoints';
import {useAxios} from '../../../hooks'

function Otp(){
	const [data,setData] = useState({
		email : localStorage.getItem('registered') ? localStorage.getItem('email') : "",
		pin : ""
	});
	const [submitting,setSubmitting] = useState(false)
	const navigate = useNavigate();
	const axiosInstance = useAxios();
	const {verifyOtp} = useGlobalContext();
	const {createNotification} = useCreateNotification();

	const sendOtp = (e) => {
		e.preventDefault();
		setSubmitting(true);
		console.log('sending =',data)
		verifyOtp(data)
			.then(res => {
				console.log('res = ',res)
				setSubmitting(false);
				localStorage.removeItem('registered');
				localStorage.removeItem('email');
				localStorage.removeItem('user_id');
				navigate('/login');
			})
			.catch(err => {
				console.log('error occured',err);
				createNotification({
					title : "email verification",
					type : "failure",
					timer : 5000,
					message : err.response.data.message,
					icon : "material-symbols:sms-failed"
				})
				setSubmitting(false);
			})
		// axiosInstance.post(`${endpoints.otpVerification}`,{
		// 	otp : otp
		// })
		
	}

	const changeHandler = (e) => {
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	useEffect(() => {
		if(!localStorage.getItem('registered')){
			navigate('/register');
		}
		
	},[])

	return(
		<div className='otp-container form'>
			<form action=""
				onSubmit={sendOtp}
			>
				<div className="header">
					<h2 className="title">
						Enter otp sent to the registered email
					</h2>
					<p>
						A four digit otp is sent to your registered email. Enter it below
					</p>
				</div>
				<TextInput 
					placeholder='enter otp'
					size = "md"
					onChange = {changeHandler}
					name = "pin"
					value = {data.pin}
				/>
				<Button
					loading = {submitting}
					style = {{
						textTransform : "capitalize"
					}}
					type = "submit"
				>
					{
						submitting ?
						"submitting otp":
						"Submit otp"
					}
				</Button>
			</form>
		</div>
	)

}

export default Otp;
