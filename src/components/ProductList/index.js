import Product from '../Product';
import { Grid, makeStyles } from '@material-ui/core';

const ProductList = (props) => {
	const classes = useStyles();
	const products = props.list;

	return (
		<Grid className={classes.root} container spacing={5}>
			{products.map((value) => (
				<Grid key={value.id} item>
					<Product product={value} />
				</Grid>
			))}
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '3% 7%',
		'&::after': {
			content: '""',
			maxHeight: '0px',
			width: '324px',
		},
		justifyContent: 'space-between',
		'@media screen and (min-width: 1002px) and (max-width: 1092px)': {
			padding: '3% 3%',
		},
		'@media screen and (max-width: 719px)': {
			padding: '3% 3%',
		},
		'@media screen and (max-width: 670px)': {
			justifyContent: 'center',
		},
	},
	grow: {
		flexGrow: 1,
	},
}));

export default ProductList;
