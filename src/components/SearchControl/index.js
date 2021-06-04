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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NumberField from '../NumberField';

const SearchControl = (props) => {
	const classes = useStyles();

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
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {},
	});

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<div>
			<Card className={classes.root}>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<CardContent className={classes.content}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={3}>
								<TextField
									className={classes.input}
									id='search-name'
									name='name'
									size='small'
									label='Name'
									variant='outlined'
									{...register('name')}
									error={!!errors.name}
									helperText={errors.name?.message}
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
