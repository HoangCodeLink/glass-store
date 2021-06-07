import { AddShoppingCartSharp } from '@material-ui/icons';
import React, { useContext } from 'react';
import {
	Button,
	ButtonBase,
	Grid,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const Product = (props) => {
	const classes = useStyles();
	const { id, name, price, img } = props.product;
	const { dispatch } = useContext(AppContext);

	const addToCart = (e) => {
		e.preventDefault();
		dispatch({ type: 'ADD_TO_CART', product: props.product });
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container justify='center' direction='column' spacing={2}>
					<Grid item>
						<Link to={`/products/${id}`}>
							<ButtonBase className={classes.image}>
								<img
									className={classes.img}
									alt='complex'
									src={img || '/default_thumbnail.png'}
								/>
							</ButtonBase>
						</Link>
					</Grid>
					<Grid item xs={12} sm container direction='column'>
						<Grid item xs>
							<Link className={classes.name} to={`/products/${id}`}>
								<Typography gutterBottom variant='subtitle1'>
									{name}
								</Typography>
							</Link>
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
								className={classes.button}
								onClick={addToCart}
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
			backgroundColor: '#22A7F0'
		}
	}
}));

export default Product;
