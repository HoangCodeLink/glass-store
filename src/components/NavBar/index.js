import {
	AppBar,
	Badge,
	Button,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import React from 'react';
import { Add } from '@material-ui/icons';

const NavBar = (props) => {
	const classes = useStyles();

	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='logo'>
					<img className={classes.img} alt='complex' src='/logo.png' />
				</IconButton>
				<Typography className={classes.title} variant='h6' noWrap>
					Eyeglass Store
				</Typography>
				<div className={classes.grow} />
				<Button
					edge='start'
					color='inherit'
					variant='outlined'
					aria-label='New Product'
					aria-controls='NewProduct'
					title='New Product'
					size='medium'
					startIcon={<Add />}>
					<span className={classes.buttonText}>New Product</span>
				</Button>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	img: {
		width: 90,
		height: 90,
	},
}));

export default NavBar;
