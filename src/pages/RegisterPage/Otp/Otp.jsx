import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react'
import './Otp.css'

import {
	useNavigate
} from 'react-router-dom';
import { useAuthContext } from '../../../hooks';
import { endpoints } from '../../../utils/endpoints/authEndpoints';
import {useAxios} from '../../../hooks'

function Otp(){

	const [otp,setOtp] = useState("");
	const [submitting,setSubmitting] = useState(false)

	const navigate = useNavigate();
	const {token} = useAuthContext();
	const axiosInstance = useAxios();
	const sendOtp = (e) => {
		e.preventDefault();
		// axiosInstance.post(`${endpoints.otpVerification}`,{
		// 	otp : otp
		// })
		navigate('/');
	}

	const changeHandler = (e) => {
		setOtp(e.target.value);
	}

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
