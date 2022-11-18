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
import {
	Link
} from 'react-router-dom';
import { Icon } from '@iconify/react';
import Joi from 'joi-browser';

import AccountInfo from '../AccountInfo';
import PersonalInfo from '../PersonalInfo';
import AddAvatar from '../AddAvatar/AddAvatar';

import {dateSchema, emailSchema, nameSchema, passwordSchema, genderSchema, phoneSchema} from '../../../utils/schemas/schema';
import {getJoiErrorMsg} from '../../../utils/getJoiErrors';

import './Register.css'
import { valid } from 'joi';

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
	const [active,setActive] = useState(2);
	
	const stepper = useRef(null);

	const nextStep = () => setActive(current => {
		console.log('setting next',current);
		return current < 2 ? current + 1 : current;
	});

	const prevStep = () => setActive(current => current > 0 ? current - 1 : current);

	const validateRepeatPassword = (pwd) => {

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
				break;
				
			case "repeat_password":
				let result = value == data.password;
				if(!result){
					error = "password doesnot match"
				}
				break;
			
			case "name":
				console.log('inside name',value)
				console.log(getJoiErrorMsg(Joi.validate(value,nameSchema)))
				error = getJoiErrorMsg(Joi.validate(value,nameSchema).error);
				break;
			
			case "dateofbirth":
				console.log('inside dob',value)
				console.log(getJoiErrorMsg(Joi.validate(value,dateSchema)))
				error = getJoiErrorMsg(Joi.validate(value,dateSchema).error);
				break;

			case "gender":
				console.log(getJoiErrorMsg(Joi.validate(value,genderSchema)))
				error = getJoiErrorMsg(Joi.validate(value,genderSchema).error);
				break;
			
			case "phonenumber]":
				console.log(getJoiErrorMsg(Joi.validate(value,phoneSchema)))
				error = getJoiErrorMsg(Joi.validate(value,phoneSchema).error);
				break;
			
			case "avatar":
				console.log('avatar = ',value);
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
	

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitting',data)
	}

	const beforeNextStepHandler = (e) => {
		if(active == 0 && (valid.email && valid.password && valid.repeat_password)){
			nextStep();
		}		
		if(active == 1 && (valid.name && valid.dateofbirth && valid.gender && valid.phonenumber)){
			nextStep()
		}
	}

	// const getValidStepStatus = () => {
	// 	switch(active){
	// 		case 0:
	// 			return !validSteps.firstStep;
	// 			break;
	// 		case 1:
	// 			return !validSteps.secondStep
	// 			break;
	// 	}
	// }

	return(
		<div className = "form">
			<h2 className="title">
				Create an account
			</h2>
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
						/>
					</Stepper.Step>
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
						active < 2 ?
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
								loading = {submitting}
								styles = {(theme) => ({
								root : {
									height : 43,
								}
								})}
								type = "submit"
							>
								{
								!submitting ?
								"Register account" :
								"logging in"
								}
							</Button>
					}
				</Group>

				{/* <Button
					leftIcon = {<Icon icon = "mdi:register" />}
					loading = {submitting}
					fullWidth
					styles = {(theme) => ({
					root : {
						height : 43,
					}
					})}
					type = "submit"
				>
					{
					!submitting ?
					"Register account" :
					"logging in"
					}
				</Button> */}
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
