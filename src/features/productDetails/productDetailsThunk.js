import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProductDetails = createAsyncThunk(
	'productDetails/get',
	(id) => {
		return fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}).then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		});
	}
);
