const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCT_LIST_START': {
			return {
				...state,
				fetchingProductList: true,
				productFilter: action.productFilter,
			};
		}
		case 'FETCH_PRODUCT_LIST_END': {
			return {
				...state,
				fetchingProductList: false,
				products: action.products,
			};
		}
		case 'FETCH_CART_START': {
			return { ...state, fetchingCart: true };
		}
		case 'FETCH_CART_END': {
			return { ...state, fetchingCart: false, cart: action.cart };
		}
        case 'SET_CART': {
			const cart = JSON.parse(localStorage.getItem('CART') ?? '{}');
			const cartSize = Object.keys(cart).length;
			return { ...state, cart, cartSize };
		}
		case 'ADD_TO_CART': {
			const cart = state.cart ?? {};
			if (!!cart[action.product.id]) {
				cart[action.product.id].quantity++;
			} else {
				cart[action.product.id] = { ...action.product, quantity: 1 };
			}
			localStorage.setItem('CART', JSON.stringify(cart));
			const cartSize = Object.keys(cart).length;
			return { ...state, cart, cartSize };
		}
		case 'REMOVE_FROM_CART': {
			const cart = state.cart ?? {};
			cart[action.product.id].quantity--;

			if (action.isAll || cart[action.product.id].quantity === 0) {
				delete cart[action.product.id];
			}
			localStorage.setItem('CART', JSON.stringify(cart));
			const cartSize = Object.keys(cart).length;
			return { ...state, cart, cartSize };
		}
		default:
			break;
	}
};

export default reducer;
