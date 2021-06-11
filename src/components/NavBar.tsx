import {
	AppBar,
	Badge,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from './Cart';
import { CartItem } from '../types';
import withDialog from '../hocs/withDialog';

interface Props {
	items: CartItem[];
	cartSize: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number, isAll?: boolean) => void;
}

export const NavBar = ({
	items,
	cartSize,
	addToCart,
	removeFromCart,
}: Props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const CartDialog = withDialog(Cart)({
		dialogProps: { title: 'Shopping Cart', open, setOpen, maxWith: 'sm' },
		items,
		addToCart,
		removeFromCart,
	});

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
				{CartDialog}
				<IconButton
					aria-label='show shopping cart'
					color='inherit'
					onClick={() => setOpen(true)}>
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
}));
