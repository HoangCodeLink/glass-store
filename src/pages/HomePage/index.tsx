import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SearchControl } from '../../components/SearchControl';
import { CartItem, Product, ProductFilter } from '../../types';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../services/productService';
import { addToCart, endLoading, startLoading } from '../../actions';
import { ProductList } from '../../components/ProductList';
import withLoading from '../../hocs/withLoading';

const HomePage = () => {
    const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
    const [filter, setFilter] = useState<ProductFilter>({ name: undefined, fromPrice: undefined, toPrice: undefined});
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
		const params = queryString.parse(location.search) as unknown as ProductFilter;
        setFilter(params);
        dispatch(startLoading());
        getProducts(params).then(list => {
            setProducts(list);
            dispatch(endLoading());
        })
	}, [location, dispatch]);

    const search = (params: any) => {
        Object.keys(filter).forEach(field => params[field] && delete params[field]);
		history.push(`/products?${queryString.stringify(params)}`);
    }

    const addToShoppingCart = (product: Product) => {
        const cartItem = { ...product, quantity: 0 } as CartItem;
        dispatch(addToCart(cartItem));
    }

    const LoadableProducts = withLoading(ProductList)({ products, addToCart: addToShoppingCart });

	return (
		<>
			<SearchControl filter={filter} search={search} />
            {LoadableProducts}
		</>
	);
};

export default HomePage;
