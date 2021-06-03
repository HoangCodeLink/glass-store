import {
	AppBar,
	Badge,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import React, { useState } from 'react';
import { Add, Cancel } from '@material-ui/icons';
import AddProduct from '../AddProduct';

const NavBar = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

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
					onClick={() => setOpen(true)}
					startIcon={<Add />}>
					<span className={classes.buttonText}>New Product</span>
				</Button>
				<Dialog
					fullWidth
					maxWidth='md'
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby='form-dialog-title'
					disableBackdropClick
					disableEscapeKeyDown>
					<DialogTitle>
						<Button
							variant='outlined'
							size='large'
							onClick={() => setOpen(false)}
							className={classes.button}
							startIcon={<Cancel />}>
							Cancel
						</Button>
					</DialogTitle>
					<DialogContent>
						<AddProduct />
					</DialogContent>
				</Dialog>
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
		width: 70,
		height: 70,
	},
	button: {
		float: 'right',
		'&:hover': {
			backgroundColor: 'red',
			color: 'white'
		},
	}
}));

export default NavBar;
