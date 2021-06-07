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
import { useContext, useState } from 'react';
import NumberField from '../NumberField';
import { AppContext } from '../App';

const AddProduct = (props) => {
	const classes = useStyles();
	const { state, dispatch } = useContext(AppContext);

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

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (data) => {
		setIsSubmitting(true);
		fetch(`${process.env.REACT_APP_API_URL}/products`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ ...data, img: photo }),
		})
			.then(async (res) => {
				// var product = await res.json();
				setIsSubmitting(false);
				dispatch({ type: 'FETCH_PRODUCT_LIST_START', productFilter: state.productFilter });
				reset();
				setPhoto(undefined);
				alert('Add product successfully!');
			})
			.catch((error) => {
				alert(error);
				setIsSubmitting(false);
			});
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
					isSubmitting ? (
						<CircularProgress size={24} className={classes.buttonProgress} />
					) : (
						<Save />
					)
				}
				disabled={isSubmitting}>
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

export default AddProduct;
