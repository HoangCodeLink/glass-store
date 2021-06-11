import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SearchControl } from '../../components/SearchControl';
import { CartItem, Product, ProductFilter } from '../../types';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { createProduct, getProducts } from '../../services/productService';
import { addToCart, endLoading, startLoading } from '../../actions';
import { ProductList } from '../../components/ProductList';
import withLoading from '../../hocs/withLoading';
import { Add } from '@material-ui/icons';
import { Button, makeStyles } from '@material-ui/core';
import withDialog from '../../hocs/withDialog';
import { AddProduct } from '../../components/AddProduct';
import { uploadPhoto } from '../../services/photoService';

const HomePage = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState<ProductFilter>({});
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (!!location.search) {
			const params = queryString.parse(
				location.search
			) as unknown as ProductFilter;
			setFilter(params);
		}
	}, []);

	useEffect(() => {
		const params = queryString.parse(
			location.search
		) as unknown as ProductFilter;
		dispatch(startLoading());
		getProducts(params).then((list) => {
			setProducts(list);
			dispatch(endLoading());
		});
	}, [location, dispatch]);

	const search = (params: any) => {
		Object.keys(params).forEach(
			(field) => params[field] && delete params[field]
		);
		history.push(`/products?${queryString.stringify(params)}`);
	};

	const addToShoppingCart = (product: Product) => {
		const cartItem = { ...product, quantity: 0 } as CartItem;
		dispatch(addToCart(cartItem));
	};

	const LoadableProducts = withLoading(ProductList)({
		products,
		addToCart: addToShoppingCart,
	});

	const AddProductDialog = withDialog(AddProduct)({
		createProduct,
		uploadPhoto,
		dialogProps: {
			title: 'New Product',
			open,
			setOpen,
			maxWith: 'md',
		},
	});

	return (
		<>
			<SearchControl filter={filter} search={search} />
			<Button
				color='inherit'
				variant='outlined'
				aria-label='New Product'
				aria-controls='NewProduct'
				title='New Product'
                className={classes.button}
				size='medium'
				onClick={() => setOpen(true)}
				startIcon={<Add />}>
				New Product
			</Button>
			{AddProductDialog}
			{LoadableProducts}
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	button: {
		margin: '20px 50px',
		float: 'left',
	},
}));

export default HomePage;
