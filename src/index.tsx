import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './stores';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</Provider>,
	document.getElementById('root')
);
