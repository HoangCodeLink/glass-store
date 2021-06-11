import { createSlice } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart } from '../actions';
import { getCart as fetchCart, setCart } from '../services/cartService';
import { CartState } from '../types';

const initialState: CartState = {
	cart: {},
	cartSize: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCart, (state) => {
			state.cart = fetchCart();
			state.cartSize = Object.keys(state.cart).length;
		});
		builder.addCase(addToCart, (state, action) => {
			const item = state.cart[action.payload.id] ?? action.payload;
			item.quantity++;
			state.cart[item.id] = item;
			state.cartSize = Object.keys(state.cart).length;

			setCart(state.cart);
		});
		builder.addCase(removeFromCart, (state, action) => {
			const item = state.cart[action.payload.id];

			if (item === undefined) {
				return;
			}

			if (action.payload.isAll || item?.quantity === 1) {
				delete state.cart[item.id];
				state.cartSize = Object.keys(state.cart).length;
			} else {
				item.quantity--;
			}
			setCart(state.cart);
		});
	},
});

export default cartSlice.reducer;
