import { Grid, makeStyles } from '@material-ui/core';
import { CartItem as Item } from '../types';
import { CartItem } from './CartItem';

interface Props {
	items: Item[];
	addToCart: (item: Item) => void;
	removeFromCart: (id: number, isAll?: boolean) => void;
}

export const Cart = ({ items, addToCart, removeFromCart }: Props) => {
	const classes = useStyles();

	return (
		<Grid
			className={classes.root}
			justify='center'
			alignItems='center'
			direction='column'
			container>
			{items.length > 0 ? (
				items.map((value: Item) => (
					<Grid key={value.id} item className={classes.item}>
						<CartItem item={value} addToCart={addToCart} removeFromCart={removeFromCart} />
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
