import { AddShoppingCartSharp } from '@material-ui/icons';
import React from 'react';
import {
	Button,
	ButtonBase,
	Grid,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';

const Product = (props) => {
	const classes = useStyles();
	const { id, name, price, img } = props.product;

	const addToCart = (e) => {
		e.preventDefault();
		const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
		if (!!cart[id]) {
			cart[id].quantity++;
		} else {
			cart[id] = { ...props.product, quantity: 1 }
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container justify='center' direction='column' spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img
								className={classes.img}
								alt='complex'
								src={img || '/default_thumbnail.png'}
							/>
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container direction='column'>
							<Grid item xs>
								<Typography gutterBottom variant='subtitle1'>
									{name}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='subtitle1'>${price}</Typography>
								<Button
									edge='start'
									color='inherit'
									variant='outlined'
									aria-label='Add To Cart'
									aria-controls='AddToCart'
									title='Add To Cart'
									onClick={addToCart}
									size='medium'
									startIcon={<AddShoppingCartSharp />}>
									<span className={classes.buttonText}>Add To Cart</span>
								</Button>
							</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	image: {
		width: 250,
		height: 200,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));

export default Product;
