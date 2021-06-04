import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../NavBar';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ProductList from '../ProductList';
import SearchControl from '../SearchControl';
import { createContext, useReducer } from 'react';
import reducer from '../../reducer';

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

export const AppContext = createContext({});

function App() {
	const [state, dispatch] = useReducer(reducer, {});

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<ThemeProvider theme={theme}>
				<div className='App'>
					<NavBar />
					<SearchControl />
					<ProductList />
				</div>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
