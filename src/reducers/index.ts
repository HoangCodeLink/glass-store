import cartReducer from './cartSlice'
import rootReducer from './rootReducer'

const reducer = {
    root: rootReducer,
    cart: cartReducer
}

export default reducer;