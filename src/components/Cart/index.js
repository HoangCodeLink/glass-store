import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
	const classes = useStyles();
	const [products, setProducts] = useState(
		Object.values(JSON.parse(localStorage.getItem('cart') ?? '{}'))
	);

	// temperary function
	const removeItem = (id) => {
		setProducts(products.filter((x) => x.id !== id));
	};

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
						<CartItem item={value} removeItem={removeItem} />
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

export default Cart;
