import { Button, Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AppContext } from './../App/index';
import { AddShoppingCartSharp } from '@material-ui/icons';
import { Oval, useLoading } from '@agney/react-loading';

const ProductDetails = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(AppContext);
	const [product, setProduct] = useState(undefined);
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

	const getDetails = async (id) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}).then(async (res) => {
			let data = await res.json();
			if (res.status === 200) {
				setProduct(data);
				return;
			}
			console.log(JSON.stringify(data));
		});
	};

	useEffect(() => {
		getDetails(id);
	}, [id]);

	const addToCart = (e) => {
		e.preventDefault();
		dispatch({ type: 'ADD_TO_CART', product: product });
	};

	return !!product ? (
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
						onClick={addToCart}
						size='medium'
						startIcon={<AddShoppingCartSharp />}>
						Add To Cart
					</Button>
				</Grid>
			</Grid>
		</Grid>
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

export default ProductDetails;
