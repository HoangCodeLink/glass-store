import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../NavBar';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#2b3030',
			},
			secondary: {
				main: '#ffffff',
			}
		},
	})
);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<NavBar />
				<h2>Product List</h2>
			</div>
		</ThemeProvider>
	);
}

export default App;
