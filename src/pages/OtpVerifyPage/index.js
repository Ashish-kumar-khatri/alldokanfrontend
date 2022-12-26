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
        pin : ""
    });

    const [submitting,setSubmitting] = useState(false);
    const [canResend,setCanResend] = useState(true);
    const [sending,setSending] = useState(false);

    const [showSendOtpBtn,setShowSendOtpBtn] = useState(true);
    const [otpSentSuccess,setOtpSentSuccess] = useState(false);

    const {user} = useAuthContext();
    const {verifyOtp,sendOtp} = useGlobalContext();
    const {createNotification,createToast} = useCreateNotification();

    const navigate = useNavigate();
    const from = useLocation().state?.from.split('/')[1];

    const submitHandler = (e) => {
        e.preventDefault();
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
    }

    const sendOtpHandler = (e) => {
        e.preventDefault();
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

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            e.returnValue = "";
        })
    },[])

    return(
       <SimpleLayout>
            <div className = "otp-verify-container">
                <div className = "illustration">
                    <img src = {Mailbro} />
                </div>
                {/* email otp section */}
                <form
                    onSubmit = {sendOtpHandler}
                    ref = {formRef}
                >
                        <TextInput 
                            placeholder = "Email address"
                            name = "email"
                            onChange = {changeHandler}
                            value = {data.email}
                            size = "md"
                            rightSection={
                                sending ?  <Icon icon = "eos-icons:loading" /> :
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
                        <button type = "submit" hidden></button>
                </form>

                <form onSubmit = {submitHandler} ref = {formRef}>
                    <TextInput 
                        name = "pin"
                        onChange = {changeHandler}
                        value = {data.pin}
                        size = "md"
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
                </form>
            </div>
       </SimpleLayout>
    )
}

export default OtpVerifyPage;