import Product from '../Product';
import { Grid, makeStyles } from '@material-ui/core';
import { AppContext } from './../App/index';
import { useContext, useEffect } from 'react';
import queryString from 'query-string';
import { Oval, useLoading } from '@agney/react-loading';

const ProductList = (props) => {
	const classes = useStyles();
	const { state, dispatch } = useContext(AppContext);

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

	const getProducts = async () => {
		const url = `${
			process.env.REACT_APP_API_URL
		}/products?${queryString.stringify(state.productFilter)}`;
		fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}).then(async (res) => {
			let data = await res.json();
			if (res.status === 200) {
				dispatch({ type: 'FETCH_PRODUCT_LIST_END', products: data });
				return;
			}
			console.log(JSON.stringify(data));
		});
	};

	useEffect(() => {
		if (!!state.fetchingProductList) {
			getProducts();
		}
	}, [state.fetchingProductList]);

	return (
		<Grid className={classes.root} container spacing={5}>
			{!!state.fetchingProductList || !!!state.products ? (
				loader
			) : state.products?.length > 0 ? (
				state.products.map((value) => (
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

export default ProductList;
