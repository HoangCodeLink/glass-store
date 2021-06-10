import { Button, Grid, makeStyles } from '@material-ui/core';
import { AddShoppingCartSharp } from '@material-ui/icons';
import { Product } from '../types';

interface Props {
	product?: Product;
	addToCart: (product: Product) => void;
}

export const ProductDetails = ({ product, addToCart }: Props) => {
	const classes = useStyles();

	return !!!product ? (
		<h2>Product Not Found</h2>
	) : (
		<Grid container>
			<Grid className={classes.photo} item xs={12} sm={6}>
				<img src={product?.img} alt='' width='80%' />
			</Grid>
			<Grid item container xs={12} sm={6}>
				<Grid className={classes.left} item xs={12}>
					<h1>{product?.name}</h1>
				</Grid>
				<Grid className={classes.left} item xs={12}>
					<h3>Description: </h3>
					{product?.shortDesc}
				</Grid>
				<Grid className={classes.left} item xs={12}>
					<h3>Price: </h3>${product?.price}
				</Grid>
				<Grid item xs={12}>
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
