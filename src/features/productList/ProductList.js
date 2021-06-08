import { Grid, makeStyles } from '@material-ui/core';
import { Oval, useLoading } from '@agney/react-loading';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getProducts } from './productListThunk';
import { Product } from '../product/Product';

export const ProductList = (props) => {
	const classes = useStyles();
	const error = useSelector(state => state.productList.error);
	const fetching = useSelector(state => state.productList.fetching);
	const products = useSelector(state => state.productList.products);

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
		indicator: <Oval width='30' />,
	});
	const loader = <section {...containerProps}>{indicatorEl}</section>;

	useEffect(() => {
		if (!!error) {
			alert(error);
		}
	}, [error])

	return (
		<Grid className={classes.root} container spacing={5}>
			{!!fetching ? (
				loader
			) : products?.length > 0 ? (
				products.map((value) => (
					<Grid key={value.id} item>
						<Product product={value} />
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
