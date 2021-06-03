import Product from '../Product';
import { Grid, makeStyles } from '@material-ui/core';

const ProductList = (props) => {
	const classes = useStyles();
	const products = props.list;

	return (
		<Grid className={classes.root} container justify='space-evenly' spacing={5}>
			{products.map((value, i) => (
				<Grid key={i} item>
					<Product product={value} />
				</Grid>
			))}
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 20,
	},
	grow: {
		flexGrow: 1,
	},
}));

export default ProductList;
