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
import React, { useState } from 'react';
import NumberField from './NumberField';
import { Photo, Product } from '../types';

interface Props {
	uploadPhoto: (file: File) => Promise<Photo>;
	createProduct: (product: Product) => Promise<Product>;
}

interface FormInputs {
	name: string,
	price: number,
	shortDesc: string
}

export const AddProduct = ({ uploadPhoto, createProduct }: Props) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

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
	} = useForm<FormInputs>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {},
	});

	const onSubmit = async (data: Product) => {
		setLoading(true)
		data.img = photo;
		await createProduct(data);
		setLoading(false);
		reset();
		setPhoto('');
	};

	const [photo, setPhoto] = useState<string>('');

	const loadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e?.target?.files?.item(0);
		if (!!!file) {
			return;
		}
		const data = await uploadPhoto(file);
		setPhoto(data.url);
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
						<CircularProgress size={24} />
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
