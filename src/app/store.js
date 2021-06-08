import {
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import addProductReducer from '../features/addProduct/addProductSlice';
import cartReducer from '../features/cart/cartSlice';
import productDetailsReducer from '../features/productDetails/productDetailsSlice';
import productListReducer from '../features/productList/productListSlice';

const store = configureStore({
	reducer: {
		addProduct: addProductReducer,
		cart: cartReducer,
		productDetails: productDetailsReducer,
		productList: productListReducer,
	},
	middleware: [...getDefaultMiddleware()],
	devTools: true,
});

export default store;
