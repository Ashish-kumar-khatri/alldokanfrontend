import React,{
	useState,
	useRef,
	useEffect
} from 'react'

import {
	TextInput,
	Button,
	PasswordInput,
	Stepper,
	Group
} from '@mantine/core';
import {showNotification, useNotifications} from '@mantine/notifications';

import {
	Link,
	useLocation,
	useNavigate
} from 'react-router-dom';
import { Icon } from '@iconify/react';
import Joi from 'joi-browser';

import AccountInfo from '../AccountInfo';
import PersonalInfo from '../PersonalInfo';
import AddAvatar from '../AddAvatar/AddAvatar';

import {dateSchema, emailSchema, nameSchema, passwordSchema, genderSchema, phoneSchema} from '../../../utils/schemas/schema';
import {getJoiErrorMsg} from '../../../utils/getJoiErrors';

import axios from 'axios';

import './Register.css'
import { valid } from 'joi';
import { endpoints } from '../../../utils/endpoints/authEndpoints';
import {useAuthContext,useAuth,useCloudinaryContext, useCreateNotification, useGlobalContext} from '../../../hooks/';

const fields = {
	email : "",
	password : "",
	repeat_password : "",
	phone_number : "",
	date_of_birth : "",
	gender : "",
	avatar : "",
	person_name : ""
}

function Register(){
	const steps = 4;
	const [active,setActive] = useState(0);
	const [uploadingImg,setUploadingImg] = useState(false);
	const [submitting,setSubmitting] = useState(false);
	const [data,setData] = useState(fields);
	const [valid,setValid] = useState({
			email : false,
			password : false,
			repeat_password : false,
			phone_number : false,
			date_of_birth : false,
			gender : false,
			avatar : false,
			person_name : false
	})
	const [errors,setErrors] = useState(fields)
	// avatar
	const [avatar,setAvatar] = useState(null);
	// data img url for persisting captured image when moved to next step
	const [avatarDataImg,setAvatarDataImg] = useState(null);
	const [alreadyUploadedAvatar,setAlreadyUploadedAvatar] = useState(false);
	
	const {createNotification} = useCreateNotification();
	const {register} = useAuth();
	const {uploadToCloudinary} = useCloudinaryContext();
	const navigate = useNavigate();
	const location = useLocation();

	const submitHandler = async (e) => {
		e.preventDefault();
		setUploadingImg(true);
		try{
			if(!alreadyUploadedAvatar){
				let res = await uploadToCloudinary({
					image : data.avatar,
					type : "profile"
				})
				setAlreadyUploadedAvatar(true);
				setData(prev => ({
					...prev,
					avatar : res.secure_url
				}))
			}
			setUploadingImg(false);
			setSubmitting(true);
		}catch(err){
			console.log('error occured',err)
		}
	}

	const stepsValid = {
		first : valid.email && valid.password && valid.repeat_password,
		second : valid.phone_number && valid.date_of_birth && valid.gender && valid.person_name,
		third : valid.avatar
	}

	const changeHandler = ({name,value}) => {
		setData(prev => (
			{
				...prev,
				[name] : value
			}
		))

		let error;
		switch(name){
			case "email":
				error = getJoiErrorMsg(Joi.validate(value,emailSchema).error);
				break;
			
			case "password":
				error = getJoiErrorMsg(Joi.validate(value,passwordSchema).error);
				if(data.repeat_password != "" && value != data.repeat_password) {
					setErrors(prev => ({...prev,repeat_password : "password doesnot match"}));
					setValid(prev => ({
						...prev,
						repeat_password : false
					}))
				}else{
					setErrors(prev => ({...prev,repeat_password : null}));
					setValid(prev => ({
						...prev,
						repeat_password : true
					}))
				}
				break;
				
			case "repeat_password":
				let result = value == data.password;
				if(!result){
					error = "password doesnot match"
				}
				break;
			
			case "person_name":
				error = getJoiErrorMsg(Joi.validate(value,nameSchema).error);
				break;
			
			case "date_of_birth":
				console.log(getJoiErrorMsg(Joi.validate(value,dateSchema)))
				error = getJoiErrorMsg(Joi.validate(value,dateSchema).error);
				break;

			case "gender":
				error = getJoiErrorMsg(Joi.validate(value,genderSchema).error);
				break;
			
			case "phone_number":
				error = getJoiErrorMsg(Joi.validate(value,phoneSchema).error);
				break;
			
			case "avatar":
				error = false;
				break;
		}

		if(!error){
			setValid(prev => ({
				...prev,
				[name] : true
			}))
			setErrors(prev => ({
				...prev,
				[name] : null
			}))
		}else{
			setValid(prev => ({
				...prev,
				[name] : false
			}))
			setErrors(prev => ({
				...prev,
				[name] : error
			}))
		}
	}

	const goNext = (e) => {
		if(active == steps - 1) {
			return;
		};
		console.log(active)
		switch(active){
			case 0:
				console.log('inside first case ',stepsValid.first)
				if(stepsValid.first) {
					console.log('setting active step');
					setActive(prev => prev + 1);
				}
				break;

			case 1:
				if(stepsValid.second) setActive(prev => prev + 1);
				break;
			
			case 2:
				if(stepsValid.third) setActive(prev => prev + 1);
				break;
		}
	}

	const goPrev = (e) => {
		if(active == 0) return;
		setActive(prev => prev - 1);
	}

	useEffect(() => {
		if(submitting){
			register(data)
				.then(res => {
					createNotification({
						title : "register",
						type : "success",
						timer : 5000,
						message : "successfully created account",
						icon : "material-symbols:sms-failed"
					})
					createNotification({
						title : "otp",
						type : "success",
						timer : 5000,
						message : "otp is sent to the registered email",
						icon : "material-symbols:sms-failed"
					})
					localStorage.setItem("registered",true);
					navigate('otp/',{
						state : {
							from : location.pathname
						}
					})
					setSubmitting(false);
				})
				.catch(err => {
					createNotification({
						title : "registration",
						type : "failure",
						timer : 5000,
						message : JSON.stringify(err.response.data),
						icon : "material-symbols:sms-failed"
					})
					setSubmitting(false);
				})
		}
	},[submitting])

	return(
		<div className = "form">
			<div className="header">
				<h2 className="title">
					Create an account
				</h2>
				<p>
					Enter the email address you used when you joined and we’ll send you instructions to reset your password.
				</p>
			</div>
			<form 
				action=""
				onSubmit = {submitHandler}
		  	>
				<Stepper className = "steps-container" active = {active}>
			  		<Stepper.Step label = "Account information" icon = {<Icon icon = "ic:outline-switch-account" />}>
						<AccountInfo 
							onChange = {changeHandler}
							data = {data}
							errors = {errors}
						/> 
					</Stepper.Step>
					<Stepper.Step label = "Personal information" icon = {<Icon icon = "mdi:face-man-profile" />}>
						<PersonalInfo 
							onChange = {changeHandler}
							data = {data}
							errors = {errors}
						/>	
					</Stepper.Step>
					<Stepper.Step label = "Confirm" icon = {<Icon icon = "line-md:circle-to-confirm-circle-transition" />} >
						<AddAvatar 
							onChange={changeHandler}
							avatarDataImg = {avatarDataImg}
							setAvatarDataImg = {setAvatarDataImg}
							setAlreadyUploadedAvatar = {setAlreadyUploadedAvatar}
						/>
					</Stepper.Step>
					<Stepper.Completed>
						Go back and confirm all the details properly.
					</Stepper.Completed>
				</Stepper>
				<Group className = "button-group" position="center" mt="xl">
					{
						active != 0 &&
						<Button
							variant="default" 
							styles = {(theme) => ({
								root : {
									height : 43,
								}
								})}
							type = "button"
							function = "prev"
							onClick = {goPrev}
						>
							previous
						</Button>
					}
					{
						active != steps - 1 &&
						<Button
							variant="filled" 
							styles = {(theme) => ({
								root : {
									height : 43,
								}
								})}
							className = {`${uploadingImg || submitting} ? "disabled" : ""`}
							type = "button"
							function = "next"
							onClick = {goNext}
						>
							next
						</Button>
					}
					{	active == steps - 1 &&
						<Button
							variant="filled" 
							styles = {(theme) => ({
								root : {
									height : 43,
								}
								})}
							type = "submit"
							loading = {uploadingImg || submitting}
						>
							submit
						</Button>
					}
				</Group>
			  <div className="footer-text">
				<span>
				  Already have an account?
				</span>
				<Link
				  to = "/login"
				>
				  Login
				</Link>
			  </div>
		  	</form>
		</div>
	)

}

export default Register;
