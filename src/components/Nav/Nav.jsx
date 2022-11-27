import React from 'react'
import {Logo} from '../';
import './Nav.css'

import {Icon} from '@iconify/react';
import { Button } from '@mantine/core';
import { useAuthContext } from '../../hooks';

import {Link} from 'react-router-dom';

function Nav({children}){

	const {logout,user} = useAuthContext();

	const logoutHandler = (e) => {
		console.log('logging out');
		logout()
			.then(res => console.log('logged out success',res))
			.catch(err => console.log('error logging out',err));
	}

	return(
		<div className = "nav-container">
			<nav className = "wrapper">
				<Logo />
				<div className="nav-right-container">
					{children}
				</div>
				<div className="small-things">
					{
						user &&
							<div className="add-product-icon">
								<Icon icon = "material-symbols:add" />
							</div>
					}
					<div className="seperator"></div>
					<div className="profile-icon">
						{
							user &&
								<>
									<div className="image">
									<img src="https://picsum.photos/200" alt="" />
									</div>
									<span className="username">
										{user?.username}
									</span>
							</>
						}
						{
							user ?
								<Button
									onClick = {logoutHandler}
								>
									Logout
								</Button>:
								<Link to = "/login">
									<Button>
										login
									</Button>
								</Link>
						}
					</div>
				</div>
			</nav>
		</div>
	)

}

export default Nav;
