import {
	makeStyles,
	Grid,
	Typography,
	ButtonBase,
	Paper,
	Button,
} from '@material-ui/core';
import { Add, DeleteSweep, Remove } from '@material-ui/icons';
import { CartItem as Item } from '../types';

interface Props {
	item: Item,
	addToCart: (item: Item) => void;
	removeFromCart: (id: number, isAll?: boolean) => void;
}

export const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
	const classes = useStyles();

	const add = () => {
		addToCart(item);
	};

	const remove = (isAll = false) => {
		removeFromCart(item.id, isAll);
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
								src={item.img ?? '/default_thumbnail.png'}
							/>
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction='column' spacing={2}>
							<Grid item xs style={{ marginLeft: 10 }}>
								<Typography gutterBottom variant='subtitle1'>
									{item.name}
								</Typography>
								<Typography variant='body2' gutterBottom>
									${item.price}
								</Typography>
							</Grid>
							<Grid container item alignItems='center' justify='center'>
								<Button
									aria-label='Remove'
									onClick={() => remove(false)}>
									<Remove />
								</Button>
								<button
									style={{ width: '50px', backgroundColor: 'transparent' }}>
									{item.quantity}
								</button>
								<Button aria-label='Add' onClick={add}>
									<Add />
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							className={classes.delete}
							aria-label='Delete'
							onClick={() => remove(true)}>
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
