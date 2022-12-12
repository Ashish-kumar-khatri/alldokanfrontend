import { Button, TextInput } from "@mantine/core";
import { Logo } from "../../components"
import { useAuthContext,useCreateNotification,useGlobalContext } from "../../hooks";
import SimpleLayout from "../../layout/SimpleLayout";
import {useEffect, useRef, useState} from 'react';
import Mailbro from '../../assets/Mail-bro.svg';
import { Icon } from "@iconify/react";

import './style.css'
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerifyPage = () => {

    const formRef = useRef(null);

    const [data,setData] = useState({
        email : "",
        otp : ""
    });

    console.log(data)
    const [submitting,setSubmitting] = useState(false);
    const [canResend,setCanResend] = useState(true);
    const [sending,setSending] = useState(false);
    const [showEmailInput,setShowEmailInput] = useState(false);
    const [showOtpInput,setShowOtpInput] = useState(false);

    const {user} = useAuthContext();
    const {verifyOtp,sendOtp} = useGlobalContext();
    const {createNotification,createToast} = useCreateNotification();

    const navigate = useNavigate();
    console.log(useLocation());
    const from = useLocation().state?.from.split('/')[1];

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('data is = ',data)
        verifyOtp(data)
            .then(res => {
                console.log(res);
                createNotification({
                    title : "otp verification",
                    type : "success",
                    timer : 5000,
                    message : "otp verified successfully",
                    icon : "material-symbols:sms-failed"
                })
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                createNotification({
					title : "otp verification",
					type : "failure",
					timer : 5000,
					message : err?.response?.data?.message,
					icon : "material-symbols:sms-failed"
				})
            })
    }

    const changeHandler = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
        // switch(e.target.name){
        //     case "email":
        //         error = getJoiErrorMsg(Joi.validate(e.target.value,emailSchema).error);
        //         break;
        // }
    }

    const sendOtpHandler = (e) => {
        console.log('sending otp to ',data.email);
        setSending(true);
        sendOtp(data.email)
            .then(res => {
                    createToast({
                        type : "success",
                        icon : <Icon icon = "mdi:tick-circle" />,
                        message : `otp sent to ${data.email}`
                    })
                    console.log(res);
                    setSending(false);
                    setShowEmailInput(false);
                    setShowOtpInput(true);
                    setSending(false);
                })
                .catch(err => {
                    createNotification({
                        title : "otp verification",
                        type : "failure",
                        timer : 5000,
                        message : err?.response?.data?.message,
                        icon : "material-symbols:sms-failed"
                    })
                    console.log(err);
                    setSending(false);
                })
    }

    const optResendHandler = (e) => {
        e.preventDefault();
        // setResending(true);
        console.log(data);
        // resendOtp()
        //     .then(res => {
        //         createToast({
        //             icon : <Icon icon = "mdi:tick-circle" />,
        //             message : `otp sent to ${user?.email}`
        //         })
        //         setOtp("");
        //         console.log(res);
        //         setResending(false);
        //     })
        //     .catch(err => {
        //         createNotification({
		// 			title : "otp verification",
		// 			type : "failure",
		// 			timer : 5000,
		// 			message : err?.data?.message,
		// 			icon : "material-symbols:sms-failed"
		// 		})
        //         console.log(err);
        //         setResending(false);
        //     })
    }

    useEffect(() => {
        if((from == "register")){
            setData(prev => ({
                ...prev,
                email : localStorage.getItem('email') ? localStorage.getItem('email') : ""
            }))
            setShowOtpInput(true)
        }
        if(from == "login"){
            setShowEmailInput(true);
        }

    },[from])

    return(
       <SimpleLayout>
            <div className = "otp-verify-container">
                <div className = "illustration">
                    <img src = {Mailbro} />
                </div>
                {
                    (!from || showOtpInput) &&
                    <div className = "info">
                        <h2 className="title">
                            Verify your email
                        </h2>
                        <p>
                            A 6-digit code has been sent to 
                            <br />
                            <span className = "bold">
                                {user?.email}
                            </span>
                        </p>
                    </div>
                }
                {
                    showEmailInput &&
                    <div className = "info">
                        {/* <p>
                            Enter email used while creating account                            
                        </p> */}
                    </div>
                }
                <form
                    onSubmit = {submitHandler}
                    ref = {formRef}
                >
                    {
                        showEmailInput &&
                            <TextInput 
                                placeholder = "Email address"
                                name = "email"
                                disabled = {submitting}
                                onChange = {changeHandler}
                                value = {data.email}
                                size = "md"
                            />
                    }
                   {
                    (!from || showOtpInput) &&
                        <TextInput 
                            name = "otp"
                            disabled = {submitting}
                            onChange = {changeHandler}
                            value = {data.otp}
                        />
                   }
                    {
                        (!from || showOtpInput) &&
                        <ul className="guides">
                            <li>The otp will expire in
                                <span className = "time bold">
                                    5:59
                                </span>
                            </li>
                            <li>Didn't recieve the code?
                                {
                                    sending ?
                                        <Icon icon = "line-md:loading-twotone-loop"/>:
                                        <a 
                                            href = "#"
                                            className = {`${!canResend ? "inactive" : ""}`}
                                            onClick = {sendOtpHandler}
                                        >
                                            Resend OTP
                                        </a>
                                }
                            </li>
                        </ul>
                    }
                   {
                    showOtpInput ?
                        <Button
                            type = "submit"
                            fullWidth
                            loading = {submitting}
                        >
                            verify
                        </Button>:
                        <Button
                            fullWidth
                            onClick = {(e) => {
                                e.preventDefault();
                                sendOtpHandler();
                                // setShowOtpInput(true);
                                // setShowEmailInput(false);
                            }}
                            disabled = {data.email == ""}
                            loading = {sending}
                        >
                            {
                                sending ?
                                "sending otp":
                                "send otp"
                            }
                        </Button>
                   }
                </form>
            </div>
       </SimpleLayout>
    )
}

export default OtpVerifyPage;