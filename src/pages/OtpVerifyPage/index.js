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

    const [showSendOtpBtn,setShowSendOtpBtn] = useState(true);
    const [otpSentSuccess,setOtpSentSuccess] = useState(false);
    // const [showResendOtpBtn,setShowResendOtpBtn] = useState(false);

    const {user} = useAuthContext();
    const {verifyOtp,sendOtp} = useGlobalContext();
    const {createNotification,createToast} = useCreateNotification();

    const navigate = useNavigate();
    console.log(useLocation());
    const from = useLocation().state?.from.split('/')[1];

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('data is = ',data)
        setSubmitting(true);
        verifyOtp(data)
            .then(res => {
                console.log(res);
                setSubmitting(false);
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
                setSubmitting(false);
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

        if(e.target.name == "email"){
            setShowSendOtpBtn(true);
        }
        // switch(e.target.name){
        //     case "email":
        //         error = getJoiErrorMsg(Joi.validate(e.target.value,emailSchema).error);
        //         break;
        // }
    }

    const sendOtpHandler = (e) => {
        console.log('sending otp to ',data.email);
        setSending(true);
        setShowSendOtpBtn(false);
        sendOtp(data.email)
            .then(res => {
                    createToast({
                        type : "success",
                        icon : <Icon icon = "mdi:tick-circle" />,
                        message : `otp sent to ${data.email}`
                    })
                    console.log(res);
                    setSending(false);
                    setOtpSentSuccess(true);
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
                    setOtpSentSuccess(false);
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

    // useEffect(() => {
    //     if((from == "register")){
    //         setData(prev => ({
    //             ...prev,
    //             email : localStorage.getItem('email') ? localStorage.getItem('email') : ""
    //         }))
    //         setShowOtpInput(true)
    //     }
    //     if(from == "login"){
    //         setShowEmailInput(true);
    //     }

    // },[from])

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            // console.log("UNLOAD:2");
            e.returnValue = "";
        })
    },[])

    return(
       <SimpleLayout>
            <div className = "otp-verify-container">
                <div className = "illustration">
                    <img src = {Mailbro} />
                </div>
                    {/* <div className = "info">
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
                    </div> */}
                <form
                    onSubmit = {submitHandler}
                    ref = {formRef}
                >
                        <TextInput 
                            placeholder = "Email address"
                            name = "email"
                            disabled = {sending || submitting}
                            onChange = {changeHandler}
                            value = {data.email}
                            size = "md"
                            rightSection={
                                sending ?  <Icon icon = "material-symbols:send-rounded" /> :
                                    showSendOtpBtn ?
                                        <Icon
                                            onClick={sendOtpHandler} 
                                            icon = "material-symbols:send-rounded" /> :
                                        <>
                                            {otpSentSuccess ?
                                            <Icon icon = "clarity:success-standard-solid" /> : 
                                            <Icon icon = "material-symbols:error-circle-rounded" />}
                                        </>
                            }
                            required
                        />
                       {
                        otpSentSuccess &&
                            <>
                                <TextInput 
                                    name = "otp"
                                    onChange = {changeHandler}
                                    value = {data.otp}
                                    size = "md"
                                    disabled = {submitting}
                                    placeholder = "enter otp recieved"
                                    required
                                />
                                <Button 
                                    className = {`${submitting ? "disabled" : ""}`}
                                    fullWidth
                                    type = "submit"
                                >
                                    verify otp
                                </Button>
                            </>
                       }
                        <ul className="guides">
                            {/* <li>The otp will expire in
                                <span className = "time bold">
                                    5:59
                                </span>
                            </li> */}
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
                </form>
            </div>
       </SimpleLayout>
    )
}

export default OtpVerifyPage;