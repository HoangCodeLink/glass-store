import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addToCart, endLoading, startLoading } from '../../actions';
import { ProductDetails } from '../../components/ProductDetails';
import { getProduct } from '../../services/productService';
import { CartItem, Product } from '../../types';

const DetailsPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		dispatch(startLoading());
		getProduct(+id).then((p) => {
			setProduct(p);
			dispatch(endLoading());
		});
	}, [id, dispatch]);

	const addToShoppingCart = (product: Product) => {
		const cartItem = { ...product, quantity: 0 } as CartItem;
		dispatch(addToCart(cartItem));
	};

	return <ProductDetails product={product} addToCart={addToShoppingCart} />;
};

export default DetailsPage;
