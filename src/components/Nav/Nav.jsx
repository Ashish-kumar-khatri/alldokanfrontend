import React,{
	useRef,
	useState
} from 'react'
import {
	Logo
} from '../';
import './Nav.css'
import {Icon} from '@iconify/react';
import { 
	Avatar, 
	Button, 
	Alert,
	Flex 
} from '@mantine/core';
import { 
	useAuth,
	useAuthContext,
	useGlobalContext
} from '../../hooks';
import {
	Link,
	useLocation,
	useNavigate} from 'react-router-dom';
import menuItems from './menu-items';

function Nav({burger,children}){
	const {user} = useAuthContext();
	const {logout} = useAuth();
	const {setShowAddProductModal} = useGlobalContext();

	const navigate = useNavigate();
	const location = useLocation();
	const {mobileShowSideCategories,setMobileShowSideCategories} = useGlobalContext()
	const [showAlert,setShowAlert] = useState(user?.email_verified ? false : true)

	const navMenu = useRef(null);
	const indicatorRef = useRef(null);
	const menuTriggerCheckbox = useRef(null);
	
	const logoutHandler = (e) => {
		console.log('logging out');
		logout();
		// logout()
		// 	.then(res => console.log('logged out success',res))
		// 	.catch(err => console.log('error logging out',err));
	}	

	const menuItemHandler = (e) => {
		console.log('hanbdling menu click');
		switch(e.target.getAttribute('name')){
			case "logout":
				logout();
				break;
			
			default:
				navigate(e.target.getAttribute('to'));
				break;
			
			}
			navMenu.current.classList.toggle('open');
			menuTriggerCheckbox.current.checked = false;
			indicatorRef.current.style.visibility = "hidden";
		}

	const mouseOverHandler = (e) => {
		console.log('mouse is hovering on ',e.target)
		indicatorRef.current.style.transform = `translateY(${44 * e.target.getAttribute('menu-position')}px)`;
		Array.from(navMenu.current.children).forEach(child => {
			if(child.classList.contains('active')) child.classList.remove('active'); 
		})
		e.target.classList.add('active');
		// console.log(44 * e.target.getAttribute('menu-position'))
	}

	const checkboxChangeHandler = (e) => {
		if(e.target.checked){
			indicatorRef.current.style.visibility = "visible";
			Array.from(navMenu.current.children)[1].classList.add('active')
		}else{
			indicatorRef.current.style.visibility = "hidden";
		}
		navMenu.current.classList.toggle('open');
	}

	const clickandler = (e) => {
		console.log('clicked',e.target.tagName)
		if(e.target.tagName == "svg"){
			setShowAlert(prev => !prev)
		}
	}

	const verifyNowHandler = (e) => {
		e.preventDefault();
		navigate('/otp-verify',{
			state : {
				from : location.pathname
			}
		});
	}

	return(
		<>
		<div className = "nav-container">
			<nav className = "wrapper">
				<Logo />
				<div className="nav-right-container">
					{
						burger &&
						<button
							className='burger'
							onClick = {() => setMobileShowSideCategories(prev => !prev)}
						>
							<Icon icon = "icon-park-outline:hamburger-button" />
						</button>
					}
					{children}
				</div>
				<div className="small-things">
					{
						user &&
							<Button 
								className="add-product-icon"
								leftIcon = {<Icon icon = "material-symbols:add" />}
								onClick = {() => setShowAddProductModal(true)}
							>
								Add
							</Button>
					}
					{
						!user &&
							<Button
								rightIcon = {<Icon 
									style = {{
										fontSize : "var(--fs-m)"
									}}
									icon ="mdi:face-woman-profile" />
								}
								onClick = {() => navigate('/login')}
							>
								Login
							</Button>
					}
						{
							user &&
								<>
								<div className="profile-icon">
									<input type="checkbox" id = "menu-triggerer" ref = {menuTriggerCheckbox} onChange = {checkboxChangeHandler} hidden/>
									<label htmlFor = "menu-triggerer" className = "profile-menu-trigger">
										<Avatar 
											radius = {5}
											style = {{
												cursor : "pointer",
											}}
											src = {user.avatar}
										/>
										<span>
											{user.person_name}
										</span>
										<Icon icon = "mdi:chevron-down" />
									</label>
									<ul className="profile-icon__menu bordered" ref = {navMenu}>
										<div className="hover-active-indicator" ref = {indicatorRef}></div>
										{
											Object.values(menuItems).map((item,index) => (
												<li
													key = {`${item}${index}`}
													menu-position = {index}
													to = {item.to}
													onClick = {menuItemHandler}
													name = {item.name}
													onMouseOver = {mouseOverHandler}
												>
													<Icon icon = {item.icon}/>
													<span>{item.name}</span>
												</li>
											))
										}
									</ul>
									<div 
										onClick = {() => navMenu.current.classList.toggle('open')}
										className="profile-menu-close-overlay"
									></div>
							</div>
							</>
						}
				</div>
			</nav>
		</div>
		</>
	)
}

export default Nav;
