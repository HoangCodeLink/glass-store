import { Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItem } from './CartItem';

export const Cart = (props) => {
	const classes = useStyles();
	const cart = useSelector(state => state.cart.cart);
	const [products, setProducts] = useState([]);

	useEffect(() => {		
		setProducts(Object.values(cart ?? {}))
	}, [cart])

	return (
		<Grid
			className={classes.root}
			justify='center'
			alignItems='center'
			direction='column'
			container>
			{products.length > 0 ? (
				products.map((value) => (
					<Grid key={value.id} item className={classes.item}>
						<CartItem id={value.id} />
					</Grid>
				))
			) : (
				<h3>No Item</h3>
			)}
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: '20px',
	},
	item: {
		width: '100%',
	},
}));
