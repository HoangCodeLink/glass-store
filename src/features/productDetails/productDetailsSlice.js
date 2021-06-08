import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails } from "./productDetailsThunk";

const productDetailsSlice = createSlice({
    name: 'productDetails',
	initialState: { product: {} },
    extraReducers: {
        [getProductDetails.pending]: (state) => {
            state.fetching = true;
        },
        [getProductDetails.rejected]: (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        },
        [getProductDetails.fulfilled]: (state, action) => {
            state.fetching = false;
            state.product = action.payload || null;
        }
    }
});

export default productDetailsSlice.reducer;