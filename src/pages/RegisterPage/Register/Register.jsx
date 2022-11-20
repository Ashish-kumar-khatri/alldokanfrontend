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
import {showNotification} from '@mantine/notifications';

import {
	Link,
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
import {useAuthContext} from '../../../hooks/';

function Register(){
	const [data,setData] = useState({
		email : "",
		password : "",
		repeat_password : "",
		phonenumber : "",
		dateofbirth : "",
		gender : "",
		avatar : "",
		name : ""
	});

	const [capturedAvatar,setCapturedAvatar] = useState(null);

	const [errors,setErrors] = useState({
		email : "",
		password : "",
		repeat_password : "",
		phonenumber : "",
		dateofbirth : "",
		gender : "",
		avatar : "",
		name : ""
	});

	const [valid,setValid] = useState({
		email : false,
		password : false,
		repeat_password : false,
		phonenumber : false,
		dateofbirth : false,
		gender : false,
		avatar : false,
		name : false
	})

	const [validSteps,setValidSteps] = useState({
		firstStep : valid.email && valid.password && valid.repeat_password,
		secondStep : false,
		thirdStep : false
	})

	const [submitting,setSubmitting] = useState(false);
	const [uploadingImg,setUploadingImg] = useState(false);

	const [active,setActive] = useState(0);
	
	const stepper = useRef(null);
	const navigate = useNavigate();
	const {register} = useAuthContext();

	const nextStep = () => setActive(current => {
		return current < 3 ? current + 1 : current;
	});

	const prevStep = () => setActive(current => current > 0 ? current - 1 : current);

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
				break;
				
			case "repeat_password":
				let result = value == data.password;
				if(!result){
					error = "password doesnot match"
				}
				break;
			
			case "name":
				error = getJoiErrorMsg(Joi.validate(value,nameSchema).error);
				break;
			
			case "dateofbirth":
				console.log(getJoiErrorMsg(Joi.validate(value,dateSchema)))
				error = getJoiErrorMsg(Joi.validate(value,dateSchema).error);
				break;

			case "gender":
				error = getJoiErrorMsg(Joi.validate(value,genderSchema).error);
				break;
			
			case "phonenumber":
				error = getJoiErrorMsg(Joi.validate(value,phoneSchema).error);
				break;
			
			case "avatar":
				error = true;
				return;
		}

		if(!error) {
			setValid(prev => ({
				...prev,
				[name] : true
			}))
			setErrors(prev => ({
				...prev,
				[name] : null
			}))
		}else{
			setErrors(prev => ({
				...prev,
				[name] : error
			}))
			setValid(prev => ({
				...prev,
				[name] : false
			}))
		}
	}
	

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log('form submitted',data)
		register(data)
			.then(res => {
				navigate('/');
				setSubmitting(false);
			})
			.catch(err => {
				showNotification({
					title : "errors",
					description : JSON.stringify(err.response.data.error)
				})
				setSubmitting(false);
			})
	}

	const beforeNextStepHandler = (e) => {
		if(active == 0 && (valid.email && valid.password && valid.repeat_password)){
			nextStep();
		}		
		if(active == 1 && (valid.name && valid.dateofbirth && valid.gender && valid.phonenumber)){
			nextStep()
		}
		if(active == 2) nextStep(); 
	}

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
						/>1
					</Stepper.Step>
					<Stepper.Step label = "Personal information" icon = {<Icon icon = "mdi:face-man-profile" />}>
						<PersonalInfo 
							onChange = {changeHandler}
							data = {data}
							errors = {errors}
						/>	2
					</Stepper.Step>
					<Stepper.Step label = "Confirm" icon = {<Icon icon = "line-md:circle-to-confirm-circle-transition" />} >
						<AddAvatar 
							onChange={changeHandler}
							setCapturedAvatar = {setCapturedAvatar}
							capturedAvatar = {capturedAvatar}
						/>3
					</Stepper.Step>
					<Stepper.Completed>
						confirm all
					</Stepper.Completed>
				</Stepper>
				<Group className = "button-group" position="center" mt="xl">
					<Button variant="default" onClick={prevStep}
						styles = {(theme) => ({
							root : {
								height : 43,
							}
							})}
					>Back</Button>
					{
						active < 3 ?
							<Button
								onClick = {beforeNextStepHandler}
								styles = {(theme) => ({
									root : {
										height : 43,
									}
									})}
								// disabled = {getValidStepStatus()}
								>Next step</Button>:
							<Button
								leftIcon = {<Icon icon = "mdi:register" />}
								loading = {submitting || uploadingImg}
								styles = {(theme) => ({
								root : {
									height : 43,
								}
								})}
								onClick = {submitHandler}
							>
								{
								!submitting || uploadingImg ?
								"Register account" :
								"registering in"
								}
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
