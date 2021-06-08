import { createSlice } from '@reduxjs/toolkit';
import { addProduct } from './addProductThunk';

const addProductSlice = createSlice({
	name: 'addProduct',
	initialState: {},
	extraReducers: {
		[addProduct.pending]: (state) => {
			state.loading = true;
		},
        [addProduct.rejected]: (state, action) => {            
			state.loading = false;
            state.message = action.error.message;
        },
        [addProduct.fulfilled]: (state) => {            
			state.loading = false;
			state.message = 'Add Product Successfully'
        }
	},
});

export default addProductSlice.reducer;
