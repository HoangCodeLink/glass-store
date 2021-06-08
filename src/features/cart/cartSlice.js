import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cart: {} },
	reducers: {
		getCart: (state) => {
			state.cart = JSON.parse(localStorage.getItem('CART') ?? '{}');
			state.cartSize = Object.keys(state.cart).length;
		},
		addToCart: (state, action) => {
			if (!!state.cart[action.payload.id]) {
				state.cart[action.payload.id].quantity++;
			} else {
				state.cart[action.payload.id] = { ...action.payload, quantity: 1 };
			}
			localStorage.setItem('CART', JSON.stringify(state.cart));
			state.cartSize = Object.keys(state.cart).length;
		},
		removeFromCart: (state, action) => {
			state.cart[action.payload.product.id].quantity--;

			if (action.payload.isAll || state.cart[action.payload.product.id].quantity === 0) {
				delete state.cart[action.payload.product.id];
			}
			localStorage.setItem('CART', JSON.stringify(state.cart));
			state.cartSize = Object.keys(state.cart).length;
		},
	},
});

export const { getCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
