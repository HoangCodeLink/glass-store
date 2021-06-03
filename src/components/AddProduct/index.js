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
import { useState } from 'react';

const AddProduct = (props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		name: yup.string().required('Please enter product name'),
		shortDesc: yup.string().required('Please enter description'),
		price: yup
			.number()
			.required('Please enter price')
			.typeError('Please enter a valid number')
			.moreThan(0, 'Price must be greater than 0'),
	});

	const {
		register,
		handleSubmit,
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
	};

	const [photo, setPhoto] = useState();

	const loadPhoto = (e) => {
		let fr = new FileReader();
		fr.onload = () => {
			setPhoto(fr.result);
		};
		fr.readAsDataURL(e.target.files[0]);
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container spacing={3}>
				<Grid item direction='column'>
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
					<TextField
						margin='normal'
						id='price'
						name='price'
						label='Price'
						type='number'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<MonetizationOn />
								</InputAdornment>
							),
						}}
						variant='outlined'
						fullWidth
						{...register('price')}
						error={!!errors.price}
						helperText={errors.price?.message}
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
			backgroundColor: 'green',
			color: 'white',
		},
	},
}));

export default AddProduct;
