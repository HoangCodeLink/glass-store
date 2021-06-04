import { Grid, makeStyles } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import CartItem from './CartItem';

const Cart = (props) => {
	const classes = useStyles();	
	const { state } = useContext(AppContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {		
		setProducts(Object.values(state.cart ?? {}))
	}, [state.cartSize])

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
						<CartItem item={value} />
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
