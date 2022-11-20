import React from 'react'
import './SellerHomePage.css'
import {
	Navbar,
	Group,
	createStyles,
	ScrollArea,
	UserButton
} from '@mantine/core';

import {Logo} from '../../components/';

import {
	LinksGroup
} from './NavbarLinksGroup'

import SellerNavBar from './SellerNavBar/SellerNavBar';

function SellerHomePage(){
	return(
		<div className="sellerhomepage-container">
			<SellerNavBar />
		</div>
	)
}

export default SellerHomePage;
