import { CartItem, CartState, RootState } from '../types';
import cartReducer from './cartSlice'
import rootReducer from './rootReducer'

interface State {
    root: RootState,
    cart: CartState
}

const reducer = {
    root: rootReducer,
    cart: cartReducer
}

export const cartItemsSelector = (state: State) => Object.values(state.cart.cart) as CartItem[];

export const cartSizeSelector = (state: State) => state.cart.cartSize;

export const loadingSelector = (state: State) => state.root.loading;

export const errorSelector = (state: State) => state.root.error;

export default reducer;