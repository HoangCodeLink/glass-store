import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

export const getProducts = createAsyncThunk('productList/get', (filter) => {
	const url = `${
		process.env.REACT_APP_API_URL
	}/products?${queryString.stringify(filter)}`;
	return fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	}).then((response) => {
		if (!response.ok) throw Error(response.statusText);
		return response.json();
	});
});
