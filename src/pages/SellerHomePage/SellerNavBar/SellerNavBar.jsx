import React,{
	useState
} from 'react'
import {
	Navbar,
	Group,
	createStyles,
	ScrollArea,
	UserButton,
	Collapse,
	Button
} from '@mantine/core';
import { Logo } from '../../../components';
import './SellerNavBar.css'
import { LinksGroup } from '../NavbarLinksGroup';
import { Icon } from '@iconify/react';
import {useWindowSize} from '@react-hook/window-size';

const navItems = [
	{
	  label: 'Products',
	  icon: "ph:bag-simple",
	  links: [
		{ label: 'manage products', link: '#' },
		{ label: 'add products', link: '#' }
	  ],
	},
	{ label: 'Account Settings', icon: "material-symbols:settings-applications-outline" },
	{
		label : 'Security',
		icon : "material-symbols:logout-rounded",
		links : [
			{
				label : 'logout' ,link : "#"
			},
			{
				label : "log out of all devices",
				link : "#"
			}
		]
	}
]

const useStyles = createStyles((theme) => ({
	navbar: {
	  paddingBottom: 0,
	  height : "auto",
	  overflowY:"auto",
	  maxHeight : "unset",

	  '&::-webkit-scrollbar' : {
		display : "none"
	  },

	  '@media screen and (min-width : 800px)' : {
		height : "100vh",
		width : "280px",
		margin : "0"
	  }
	},
	
	header: {
	  padding: theme.spacing.md,
	  paddingTop: 0,
	  marginLeft: -theme.spacing.md,
	  marginRight: -theme.spacing.md,
	  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
	  borderBottom: `1px solid #ddd`,
	  width : "100%",
	  display : 'flex',
	  justifyContent:"center"
	},
  
	links: {
	//   marginLeft: -theme.spacing.md,
	//   marginRight: -theme.spacing.md,
	  width : '100%',
	},
	
	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		width : '100%',
	},
  
	footer: {
	  marginLeft: -theme.spacing.md,
	  marginRight: -theme.spacing.md,
	  borderTop: `1px solid ${
		theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
	  }`,
	},
}));



function SellerNavBar(){

	const [opened,setOpened] = useState(false);
	
	const [width] = useWindowSize();

	const { classes } = useStyles();
	const links = navItems.map(item => <LinksGroup {...item} key = {item.label}/>)

	const handleBurger = (e) => {
		console.log(e.target.getAttribute('type'))
		setOpened(prev => !prev);
	}

	return(
		<>
			<Navbar
				className={classes.navbar}
			>
				<Navbar.Section  className={classes.header}>
					<Group position="apart">
						<Logo/>
					</Group>
				</Navbar.Section>
				{
					<div className="burger-container">
						{
							opened ?
								<span 
									className="close"
									onClick = {handleBurger}
									type = "close"
								>
									<Icon icon = "charm:cross" />
								</span>:
								<span 
									className="open"
									onClick = {handleBurger}
									type = "open"
								>
									<Icon icon = "charm:menu-hamburger" />
								</span>
						}
					</div>
				}
				{
					width < 800 &&
						<Collapse
							in={opened}
							style = {{
								width : "90%",
							}}
						>
							<Navbar.Section className = {classes.links} grow component = {ScrollArea}> 
								<div
									className={classes.linksInner}
								>
									{links}
								</div>
							</Navbar.Section>
						</Collapse>
				}
				{
					width >= 800 &&
						<Navbar.Section className = {classes.links} grow component = {ScrollArea}> 
							<div
								className={classes.linksInner}
							>
								{links}
							</div>
						</Navbar.Section>
				}
			</Navbar>
		</>
	)

}

export default SellerNavBar;
