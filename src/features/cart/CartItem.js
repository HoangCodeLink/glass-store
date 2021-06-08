import {
	makeStyles,
	Grid,
	Typography,
	ButtonBase,
	Paper,
	Button,
} from '@material-ui/core';
import { Add, DeleteSweep, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "./cartSlice";

export const CartItem = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const product = useSelector(state => state.cart.cart[props.id]);

	const increaseAmount = (e) => {
		e.preventDefault();
		dispatch(addToCart(product));
	};

	const decreaseAmount = (e, isAll) => {
		e.preventDefault();
		dispatch(removeFromCart({ product, isAll }));
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid justify='center' alignItems='center' container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img
								className={classes.img}
								alt='complex'
								src={product?.img ?? '/default_thumbnail.png'}
							/>
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction='column' spacing={2}>
							<Grid item xs style={{ marginLeft: 10 }}>
								<Typography gutterBottom variant='subtitle1'>
									{product?.name}
								</Typography>
								<Typography variant='body2' gutterBottom>
									${product?.price}
								</Typography>
							</Grid>
							<Grid container item alignItems='center' justify='center'>
								<Button
									aria-label='Remove'
									onClick={(e) => decreaseAmount(e, false)}>
									<Remove />
								</Button>
								<button
									style={{ width: '50px', backgroundColor: 'transparent' }}>
									{product?.quantity}
								</button>
								<Button aria-label='Add' onClick={increaseAmount}>
									<Add />
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							className={classes.delete}
							aria-label='Delete'
							onClick={(e) => decreaseAmount(e, true)}>
							<DeleteSweep />
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: '1px 0',
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	delete: {
		height: '100%',
		padding: '100% 0px',
		'&:hover': {
			backgroundColor: '#d11a2a',
			color: 'white',
		},
	},
}));
