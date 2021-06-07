import {
	Button,
	Card,
	CardContent,
	Grid,
	InputAdornment,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NumberField from '../NumberField';
import { useContext, useEffect } from 'react';
import { AppContext } from './../App/index';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

const SearchControl = (props) => {
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();
	const { dispatch } = useContext(AppContext);

	const schema = yup.object().shape({
		name: yup.string(),
		fromPrice: yup
			.string()
			.test('greaterThanZero', 'Price must be greater than 0', (value) => {
				return value.length === 0 || +value > 0;
			}),
		toPrice: yup
			.string()
			.test('greaterThanZero', 'Price must be greater than 0', (value) => {
				return value.length === 0 || +value > 0;
			}),
	});

	const {
		handleSubmit,
		control,
		setValue
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const filter = queryString.parse(location.search);
		for (let key in filter) {
			setValue(key, filter[key]);
		}
		dispatch({ type: 'FETCH_PRODUCT_LIST_START', productFilter: filter });
	}, [location]);

	const onSubmit = (data) => {
		Object.keys(data).forEach(x => data[x] === '' && delete data[x]);
		history.push(`/products?${queryString.stringify(data)}`);
	};

	return (
		<div>
			<Card className={classes.root}>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<CardContent className={classes.content}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={3}>
								<Controller
									name='name'
									control={control}
									defaultValue=''
									render={({
										field: { value, onChange },
										fieldState: { error },
									}) => (
										<TextField
											className={classes.input}
											id='search-name'
											size='small'
											label='Name'
											variant='outlined'
											error={!!error}
											helperText={error}
											value={value}
											onChange={onChange}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<NumberField
									control={control}
									name='fromPrice'
									defaultValue=''
									className={classes.input}
									size='small'
									label='From'
									variant='outlined'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>$</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<NumberField
									control={control}
									name='toPrice'
									defaultValue=''
									className={classes.input}
									size='small'
									label='To'
									variant='outlined'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>$</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button
									color='primary'
									edge='start'
									type='submit'
									variant='contained'
									aria-label='Search'
									aria-controls='Search'
									className={classes.input}
									title='Search'
									size='large'
									startIcon={<Search />}>
									Search
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</form>
			</Card>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		margin: '0 5%',
		display: 'flex',
		justifyContent: 'space-between',
	},
	input: {
		width: '100%',
	},
}));

export default SearchControl;
