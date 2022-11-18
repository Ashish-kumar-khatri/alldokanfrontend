import React from 'react'
import { Link } from 'react-router-dom';

import LogoDaraz from '../../assets/daraz.svg';
import './Logo.css'

function Logo(){

	return(
		<div>
			<Link
				to = "#"
				className = "logo-container"
			>
				<img src={LogoDaraz} alt="" />
			</Link>
		</div>
	)

}

export default Logo;
