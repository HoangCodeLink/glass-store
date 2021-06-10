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

import { useState } from 'react';
import { Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Cart } from './Cart';
import { CartItem } from '../types';

interface Props {
	items: CartItem[];
	cartSize: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number, isAll?: boolean) => void;
}

export const NavBar = ({ items, cartSize, addToCart, removeFromCart }: Props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const openDialog = () => {
		setOpen(true);
	};

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
				<Dialog
					fullWidth
					open={open}
					aria-labelledby='form-dialog-title'
					disableBackdropClick
					disableEscapeKeyDown>
					<DialogTitle>
						<h2 className={classes.dtitle}>Shopping Cart</h2>
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
						<Cart items={items} addToCart={addToCart} removeFromCart={removeFromCart} />
					</DialogContent>
				</Dialog>
				<IconButton
					aria-label='show shopping cart'
					color='inherit'
					onClick={openDialog}>
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
