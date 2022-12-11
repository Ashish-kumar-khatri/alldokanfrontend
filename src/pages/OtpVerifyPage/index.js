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

    const [otp,setOtp] = useState("");
    const [submitting,setSubmitting] = useState(false);
    const [canResend,setCanResend] = useState(true);
    const [resending,setResending] = useState(false);

    const {user} = useAuthContext();
    const {verifyOtp,resendOtp} = useGlobalContext();
    const {createNotification,createToast} = useCreateNotification();

    const navigate = useNavigate();
    console.log(useLocation());
    const from = useLocation().state?.from.split('/')[1];

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('oitp is = ',otp)
        verifyOtp(otp)
            .then(res => {
                console.log(res);
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
        setOtp(e.target.value)
    }

    const optResendHandler = (e) => {
        e.preventDefault();
        setResending(true);
        resendOtp()
            .then(res => {
                createToast({
                    icon : <Icon icon = "mdi:tick-circle" />,
                    message : `otp sent to ${user?.email}`
                })
                setOtp("");
                console.log(res);
                setResending(false);
            })
            .catch(err => {
                createNotification({
					title : "otp verification",
					type : "failure",
					timer : 5000,
					message : err?.data?.message,
					icon : "material-symbols:sms-failed"
				})
                console.log(err);
                setResending(false);
            })
    }

    useEffect(() => {
        if((from !== "register" || from !== "login")){
            // formRef.current.submit();
        }
    },[from])

    return(
       <SimpleLayout>
            <div className = "otp-verify-container">
                <div className = "illustration">
                    <img src = {Mailbro} />
                </div>
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
                <form
                    onSubmit = {submitHandler}
                    ref = {formRef}
                >
                    <TextInput 
                        name = "otp"
                        disabled = {submitting}
                        onChange = {changeHandler}
                        value = {otp}
                    />
                    <ul className="guides">
                        <li>The otp will expire in
                            <span className = "time bold">
                                5:59
                            </span>
                        </li>
                        <li>Didn't recieve the code?
                            {
                                resending ?
                                    <Icon icon = "line-md:loading-twotone-loop"/>:
                                    <a 
                                        href = "#"
                                        className = {`${!canResend ? "inactive" : ""}`}
                                        onClick = {optResendHandler}
                                    >
                                        Resend code
                                    </a>
                            }
                        </li>
                    </ul>
                    <Button
                        type = "submit"
                        fullWidth
                        loading = {submitting}
                    >
                        verify
                    </Button>
                </form>
            </div>
       </SimpleLayout>
    )
}

export default OtpVerifyPage;