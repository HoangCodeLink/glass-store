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
import { ProductFilter } from '../types';
import NumberField from './NumberField';
import { useEffect } from 'react';

interface Props {
	filter: ProductFilter,
	search: (filter: ProductFilter) => void;
}

export const SearchControl = ({ filter, search }: Props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		name: yup.string(),
		fromPrice: yup
			.string()
			.test('greaterThanZero', 'Price must be greater than 0', (value) => {
				return !value || +value > 0;
			}),
		toPrice: yup
			.string()
			.test('greaterThanZero', 'Price must be greater than 0', (value) => {
				return !value || +value > 0;
			}),
	});

	const {
		handleSubmit,
		control,
		setValue
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		setValue('name', filter.name);
		setValue('fromPrice', filter.fromPrice);
		setValue('toPrice', filter.toPrice);
	}, [filter, setValue])

	const onSubmit = (data: ProductFilter) => {
		search(data);
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
