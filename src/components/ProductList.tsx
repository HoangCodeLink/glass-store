import { Grid, makeStyles } from '@material-ui/core';
import { Product as ProductType } from '../types'
import { Product } from './Product';

interface Props {
	products: ProductType[],
	addToCart: (product: ProductType) => void;
}

export const ProductList = ({ products, addToCart }: Props) => {
	const classes = useStyles();

	return (
		<Grid className={classes.root} container spacing={5}>
			{products?.length > 0 ? (
				products.map((value) => (
					<Grid key={value.id} item>
						<Product product={value} addToCart={addToCart} />
					</Grid>
				))
			) : (
				<h3>No product available</h3>
			)}
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '3% 8%',
		justifyContent: 'flex-start',
	},
	grow: {
		flexGrow: 1,
	},
}));
