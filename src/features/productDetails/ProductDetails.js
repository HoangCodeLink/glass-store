import { Button, Grid, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AddShoppingCartSharp } from '@material-ui/icons';
import { Oval, useLoading } from '@agney/react-loading';
import { getProductDetails } from './productDetailsThunk';
import { addToCart } from '../cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ProductDetails = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const error = useSelector((state) => state.productDetails.error);
	const fetching = useSelector((state) => state.productDetails.fetching);
	const product = useSelector((state) => state.productDetails.product);
	const { id } = useParams();

	const { containerProps, indicatorEl } = useLoading({
		loading: true,
		loaderProps: {
			style: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			},
		},
		indicator: <Oval width='50' />,
	});
	const loader = <section {...containerProps}>{indicatorEl}</section>;

	useEffect(() => {
		dispatch(getProductDetails(id));
	}, [id]);

	useEffect(() => {
		if (!!error) {
			alert(error);
		}
	}, [error])

	const increaseAmount = (e) => {
		e.preventDefault();
		dispatch(addToCart(product));
	};

	return !fetching ? (
		product === null ? (
			<h2>Product Not Found</h2>
		) : (
			<Grid container>
				<Grid className={classes.photo} item xs={12} sm={6}>
					<img src={product.img} alt='' width='80%' />
				</Grid>
				<Grid item container xs={12} sm={6}>
					<Grid className={classes.left} item xs={12}>
						<h1>{product.name}</h1>
					</Grid>
					<Grid className={classes.left} item xs={12}>
						<h3>Description: </h3>
						{product.shortDesc}
					</Grid>
					<Grid className={classes.left} item xs={12}>
						<h3>Price: </h3>${product.price}
					</Grid>
					<Grid item xs={12}>
						<Button
							edge='start'
							color='inherit'
							variant='outlined'
							aria-label='Add To Cart'
							aria-controls='AddToCart'
							title='Add To Cart'
							className={classes.button}
							onClick={increaseAmount}
							size='medium'
							startIcon={<AddShoppingCartSharp />}>
							Add To Cart
						</Button>
					</Grid>
				</Grid>
			</Grid>
		)
	) : (
		loader
	);
};

const useStyles = makeStyles((theme) => ({
	root: {},
	photo: {
		margin: '5% 0px',
	},
	left: {
		textAlign: 'left',
		marginLeft: '50px',
	},
	button: {
		'&:hover': {
			color: 'white',
			backgroundColor: '#22A7F0',
		},
	},
}));
