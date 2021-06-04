import Product from '../Product';
import { Grid, makeStyles } from '@material-ui/core';
import { AppContext } from './../App/index';
import { useContext, useEffect } from 'react';

const ProductList = (props) => {
	const classes = useStyles();
	const { state, dispatch } = useContext(AppContext);

	const getProducts = async () => {
		fetch(`${process.env.REACT_APP_API_URL}/products`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}).then(async (res) => {
			let data = await res.json();
			if (res.status === 200) {
				if (!!state.productFilter) {
					if (!!state.productFilter.name) {
						data = data.filter((x) => x.name.toLowerCase().includes(state.productFilter.name.toLowerCase()));
					}
					if (!!state.productFilter.fromPrice) {
						data = data.filter((x) => x.price >= state.productFilter.fromPrice);
					}

					if (!!state.productFilter.toPrice) {
						data = data.filter((x) => x.price <= state.productFilter.toPrice);
					}
				}
				dispatch({ type: 'FETCH_PRODUCT_LIST_END', products: data });
				return;
			}
			console.log(JSON.stringify(data));
		});
	};

	useEffect(() => {
		dispatch({
			type: 'FETCH_PRODUCT_LIST_START',
			productFilter: null,
		});
	}, []);

	useEffect(() => {
		if (!!state.fetchingProductList) {
			getProducts();
		}
	}, [state.fetchingProductList]);

	return (
		<Grid className={classes.root} container spacing={5}>
			{state.products?.length > 0
			? state.products.map((value) => (
					<Grid key={value.id} item>
						<Product product={value} />
					</Grid>
				))
			: <h3>No product available</h3>}
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
