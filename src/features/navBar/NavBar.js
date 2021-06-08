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

import React, { useEffect, useState } from 'react';
import { Add, Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cart } from '../cart/Cart';
import { AddProduct } from '../addProduct/AddProduct';
import { getCart } from '../cart/cartSlice';

export const NavBar = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const cartSize = useSelector((state) => state.cart.cartSize);

	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState('');
	const [dialogProps, setDialogProps] = useState({ maxWidth: 'md' });

	const openDialog = (value) => {
		setMode(value);
		setDialogProps({ maxWidth: value === 'cart' ? 'sm' : 'md' });
		setOpen(true);
	};

	useEffect(() => {
		dispatch(getCart())
	}, [])

	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='logo'>
					<Link to='/'>
						<img className={classes.img} alt='complex' src='/logo.png' />
					</Link>
				</IconButton>
				<Link className={classes.title} to='/'>
					<Typography variant='h6' noWrap>
						Eyeglass Store
					</Typography>
				</Link>
				<div className={classes.grow} />
				<Button
					edge='start'
					color='inherit'
					variant='outlined'
					aria-label='New Product'
					aria-controls='NewProduct'
					title='New Product'
					size='medium'
					onClick={() => openDialog('product')}
					startIcon={<Add />}>
					<span className={classes.buttonText}>New Product</span>
				</Button>
				<Dialog
					fullWidth
					{...dialogProps}
					open={open}
					aria-labelledby='form-dialog-title'
					disableBackdropClick
					disableEscapeKeyDown>
					<DialogTitle>
						<h2 className={classes.dtitle}>
							{mode === 'cart' ? 'Shopping Cart' : 'New Product'}
						</h2>
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
						{mode === 'product' ? <AddProduct /> : <Cart />}
					</DialogContent>
				</Dialog>
				<IconButton
					aria-label='show shopping cart'
					color='inherit'
					onClick={() => openDialog('cart')}>
					{cartSize > 0 ? (
						<Badge badgeContent={cartSize} color='error'>
							<ShoppingCartIcon />
						</Badge>
					) : (
						<ShoppingCartIcon />
					)}
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
		textDecoration: 'none',
		color: 'white',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	img: {
		width: 70,
		height: 70,
	},
	dtitle: {
		float: 'left',
		margin: 0,
	},
	button: {
		float: 'right',
		'&:hover': {
			backgroundColor: '#d11a2a',
			color: 'white',
		},
	},
}));
