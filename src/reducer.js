
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_LIST_START': {
            return { ...state, fetchingProductList: true }
        }
        case 'FETCH_PRODUCT_LIST_END': {
            return { ...state, fetchingProductList: false, products: action.products }
        }
        default: break;
    }
}

export default reducer;