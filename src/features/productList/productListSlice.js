import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productListThunk";

const productListSlice = createSlice({
    name: 'productList',
	initialState: { products: [] },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.fetching = true;
        },
        [getProducts.rejected]: (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
            state.products = [];
        },
        [getProducts.fulfilled]: (state, action) => {
            state.fetching = false;
            state.products = action.payload;
        }
    }
});

export default productListSlice.reducer;