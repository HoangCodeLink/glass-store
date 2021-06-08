import {
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MonetizationOn, Save } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import NumberField from '../NumberField';
import { addProduct } from './addProductThunk';
import { useDispatch, useSelector } from 'react-redux';

export const AddProduct = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.addProduct.loading);
	const message = useSelector(state => state.addProduct.message);

	const schema = yup.object().shape({
		name: yup.string().required('Please enter product name'),
		shortDesc: yup.string().required('Please enter description'),
		price: yup
			.number()
			.typeError('Please enter price')
			.moreThan(0, 'Price must be greater than 0'),
	});

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {},
	});

	useEffect(() => {
		if (!loading) {
			reset();
			setPhoto('');
		}
	}, [loading])

	useEffect(() => {
		if (!!message) {
			alert(message);
		}
	}, [message])

	const onSubmit = (data) => {
		dispatch(addProduct({ ...data, img: photo }));
	};

	const [photo, setPhoto] = useState();

	const loadPhoto = (e) => {
		var formData = new FormData();
		formData.append('file', e.target.files[0]);
		fetch(`${process.env.REACT_APP_API_URL}/products/photo`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: formData,
		}).then(async (res) => {
			var data = await res.json();
			setPhoto(data.url);
		});
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container spacing={3}>
				<Grid item>
					<div>
						<img
							className={classes.photo}
							src={photo || '/default_thumbnail.png'}
							alt='Thumbnail of glass'
						/>
					</div>
					<div>
						<TextField
							id='img'
							name='img'
							size='small'
							variant='outlined'
							onChange={loadPhoto}
							type='file'
						/>
					</div>
				</Grid>
				<Grid item xs={12} sm>
					<TextField
						margin='normal'
						id='name'
						name='name'
						label='Product Name'
						variant='outlined'
						fullWidth
						{...register('name')}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<NumberField
						control={control}
						margin='normal'
						name='price'
						label='Price'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<MonetizationOn />
								</InputAdornment>
							),
						}}
						variant='outlined'
						fullWidth
					/>
					<TextField
						margin='normal'
						id='shortDesc'
						name='shortDesc'
						label='Description'
						variant='outlined'
						multiline
						rows={4}
						fullWidth
						{...register('shortDesc')}
						error={!!errors.shortDesc}
						helperText={errors.shortDesc?.message}
					/>
				</Grid>
			</Grid>
			<Button
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				className={classes.button}
				startIcon={
					loading ? (
						<CircularProgress size={24} className={classes.buttonProgress} />
					) : (
						<Save />
					)
				}
				disabled={loading}>
				Save
			</Button>
		</form>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	photo: {
		height: '242px',
		width: '335px',
	},
	button: {
		marginTop: '50px',
		margin: theme.spacing(2),
		width: '30%',
		'&:hover': {
			backgroundColor: '#4DAF7C',
			color: 'white',
		},
	},
}));
