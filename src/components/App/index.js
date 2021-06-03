import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../NavBar';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ProductList from '../ProductList';
import SearchControl from '../SearchControl';

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

const products = [
	{
		id: 1,
		name: 'Browline Glasses 195421',
		shortDesc:
			'This retro browline style looks as fresh today as it did when it first arrived on the scene more than 50 years ago.',
		price: 15.95,
		img: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?resize=800px:*&output-quality=80',
	},
	{
		id: 2,
		name: 'Round Clip-On Set 6499925',
		shortDesc:
			'These chic and modern frames have a downtown vibe that will appeal to both men and women.',
		price: 23.95,
		img: 'https://static.zennioptical.com/production/products/general/64/99/6499925-clipon-front-view.jpg?resize=800px:*&output-quality=80',
	},
	{
		id: 3,
		name: 'Round Glasses 3213214',
		shortDesc:
			'These round glasses have larger lenses that work well as sunglasses or bold everyday glasses.',
		price: 19.95,
		img: 'https://static.zennioptical.com/production/products/general/32/13/3213214-eyeglasses-front-view.jpg?resize=800px:*&output-quality=80',
	},
	{
		id: 4,
		name: 'Magnetic Snap-On Set 6498921',
		shortDesc:
			'Our magnetic snap-on sunshade sets come with prescription glasses and a polarized sunshade that snaps on securely to the front rim with hidden magnets for seamless sunglasses.',
		price: 35.95,
		img: 'https://static.zennioptical.com/production/products/general/64/98/6498921-clipon-front-view.jpg?resize=800px:*&output-quality=80',
	},
	{
		id: 5,
		name: 'Round Glasses 7809225',
		shortDesc:
			'This line of vintage-inspired eyewear merges classic styles with contemporary colors and details.',
		price: 19.95,
		img: 'https://static.zennioptical.com/production/products/general/78/09/7809225-eyeglasses-front-view.jpg?resize=800px:*&output-quality=80',
	},
];

function App() {

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<NavBar />
				<SearchControl />
				<ProductList list={products} />
			</div>
		</ThemeProvider>
	);
}

export default App;
