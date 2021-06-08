import { createAsyncThunk } from '@reduxjs/toolkit';

export const addProduct = createAsyncThunk('products/add', (data) => {
	fetch(`${process.env.REACT_APP_API_URL}/products`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (response.status !== 201) throw Error(response.statusText);
		return response.json();
	});
});
