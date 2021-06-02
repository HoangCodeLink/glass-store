import Product from '../Product';
import { Grid, makeStyles } from '@material-ui/core';

const ProductList = (props) => {
    const classes = useStyles();
	const products = props.list;

	return (
		<Grid className={classes.root} item xs={12}>
			<Grid container justify='center' spacing='5'>
				{products.map((value) => (
					<Grid key={value} item>
						<Product product={value} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 20,
	},
}));

export default ProductList;
