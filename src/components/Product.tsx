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
import { Link } from 'react-router-dom';
import { Product as ProductType } from '../types';

interface Props {
	product: ProductType,
	addToCart: (product: ProductType) => void; 
}

export const Product = ({ product, addToCart }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container justify='center' direction='column' spacing={2}>
					<Grid item>
						<Link to={`/products/${product.id}`}>
							<ButtonBase className={classes.image}>
								<img
									className={classes.img}
									alt='complex'
									src={product.img || '/default_thumbnail.png'}
								/>
							</ButtonBase>
						</Link>
					</Grid>
					<Grid item xs={12} sm container direction='column'>
						<Grid item xs>
							<Link className={classes.name} to={`/products/${product.id}`}>
								<Typography gutterBottom variant='subtitle1'>
									{product.name}
								</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Typography variant='subtitle1'>${product.price}</Typography>
							<Button
								color='inherit'
								variant='outlined'
								aria-label='Add To Cart'
								aria-controls='AddToCart'
								title='Add To Cart'
								className={classes.button}
								onClick={() => addToCart(product)}
								size='medium'
								startIcon={<AddShoppingCartSharp />}>
								Add To Cart
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
	name: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
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
	button: {
		'&:hover': {
			color: 'white',
			backgroundColor: '#22A7F0',
		},
	},
}));
