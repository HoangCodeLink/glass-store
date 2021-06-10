import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationPage from './pages/NavigationPage';
import routes from './routes';

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
					<NavigationPage />
					<Switch>
						{routes.map(route => <Route {...route} />)}
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
