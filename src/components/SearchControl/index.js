import {
	Button,
	Card,
	CardContent,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
const SearchControl = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Card className={classes.root}>
				<form action='/' noValidate>
					<CardContent className={classes.content}>
						<TextField
							className={`${classes.input} ${classes.name}`}
							id='search-name'
                            name='name'
							size='small'
							label='Name of product'
							variant='outlined'
						/>
						<TextField
							className={classes.input}
							id='search-from-price'
                            name='fromPrice'
							size='small'
							label='From Price'
							variant='outlined'
						/>
						<TextField
							className={classes.input}
							id='search-to-price'
                            name='toPrice'
							size='small'
							label='To Price'
							variant='outlined'
						/>
						<Button
							color='primary'
							edge='start'
							variant='contained'
							aria-label='Search'
							aria-controls='Search'
							title='Search'
							size='large'
							startIcon={<Search />}>
							<span className={classes.buttonText}>Search</span>
						</Button>
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
		margin: '0 10px',
	},
	name: {
		flexGrow: 1,
	},
}));

export default SearchControl;
