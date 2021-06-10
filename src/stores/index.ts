import {
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import reducer from '../reducers';

const store = configureStore({
	reducer,
	middleware: [...getDefaultMiddleware()],
	devTools: true,
});

export default store;
