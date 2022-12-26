import { Button, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import {
	Link
} from 'react-router-dom';
import './Otp.css'

import {
	useNavigate
} from 'react-router-dom';
import { useAuth, useAuthContext, useCreateNotification, useGlobalContext } from '../../../hooks';
import { endpoints } from '../../../utils/endpoints/authEndpoints';
import {useAxios} from '../../../hooks'
import { Icon } from '@iconify/react';

function Otp(){
	const [data,setData] = useState({
		email : localStorage.getItem('registered') ? localStorage.getItem('email') : "",
		pin : ""
	});
	const [submitting,setSubmitting] = useState(false)
	const [resending,setResending] = useState(false);
	const navigate = useNavigate();
	const axiosInstance = useAxios();
	const {verifyOtp,sendOtp:resendOtp} = useGlobalContext();
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
				createNotification({
					title : "email verification",
					type : "success",
					timer : 5000,
					message : res.data.message,
					icon : "material-symbols:sms-failed"
				})
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

	const resendOtpHandler = (e) => {
		e.preventDefault();
		setResending(true);
		resendOtp(data.email)
			.then(res => {
				console.log(res);
				createNotification({
                    title : "resend otp",
                    type : "success",
                    timer : 5000,
                    message : `${res?.data?.message} to ${data.email}`
				}) 
				setResending(false);
			})
			.catch(err => {
				console.log('error occured',err);
                createNotification({
                    title : "resend otp",
                    type : "failure",
                    timer : 5000,
                    message : err?.response?.data?.message
				}) 
				setResending(false);
			})
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
					loading = {submitting || resending}
					style = {{
						textTransform : "capitalize"
					}}
					type = "submit"
				>
					{
						submitting ?
						"submitting otp":
							<>
								{
									resending ?
										<>
											Resending otp
										</> :
										"submit"
								}
							</>
					}
				</Button>
				{
					!resending ? 
						<a
							href = "#"
						onClick = {resendOtpHandler}
						>
							resend otp
						</a>: ""
				}
			</form>
		</div>
	)

}

export default Otp;
