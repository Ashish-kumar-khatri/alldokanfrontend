import React from 'react'
import { AuthInfoLeft, Logo } from '../../components';
import ForgotPassword from './ForgotPassword/ForgotPassword';

import './ForgotPasswordPage.css'

function ForgotPasswordPage(){

	return(
		<div className = "auth-container forgot-password">
			<AuthInfoLeft>
				<Logo />
			</AuthInfoLeft>
			<ForgotPassword />
		</div>
	)

}

export default ForgotPasswordPage;
