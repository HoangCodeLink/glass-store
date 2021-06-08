import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './features/navBar/NavBar';
import { ProductList } from './features/productList/ProductList';
import { SearchControl } from './features/searchControl/SearchControl';
import { ProductDetails } from './features/productDetails/ProductDetails';

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			primary: {
				main: '#2b3030',
			},
			secondary: {
				main: '#ffffff',
			},
		},
	})
);


function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className='App'>
					<NavBar />
					<Switch>
						<Route path='/products/:id'>
							<ProductDetails />
						</Route>
						<Route key='products' path='/products'>
							<SearchControl />
							<ProductList />
						</Route>
						<Route exact path='/'>
							<SearchControl />
							<ProductList />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
