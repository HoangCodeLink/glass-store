import { ComponentType } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

interface Props {
	dialogProps: {
		title: string;
		maxWith?: false | "xs" | "sm" | "md" | "lg" | "xl",
		open: boolean;
		setOpen: (isOpen: boolean) => void;
	};
}

const withDialog = <T extends {}>(WrappedComponent: ComponentType<T>) => {
	const WithDialog = ({ dialogProps, ...props }: T & Props) => {
		const classes = useStyles();

		return (
			<Dialog
				fullWidth
				maxWidth={dialogProps.maxWith}
				open={dialogProps.open}
				aria-labelledby='form-dialog-title'
				disableBackdropClick
				disableEscapeKeyDown>
				<DialogTitle>
					<h2 className={classes.title}>{dialogProps.title}</h2>
					<Button
						variant='outlined'
						size='large'
						onClick={() => dialogProps.setOpen(false)}
						className={classes.button}
						startIcon={<Cancel />}>
						Cancel
					</Button>
				</DialogTitle>
				<DialogContent>
					<WrappedComponent {...(props as unknown as T)} />
				</DialogContent>
			</Dialog>
		);
	};

	WithDialog.displayName = `WithDialog(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`;
	return WithDialog;
};

const useStyles = makeStyles((theme) => ({
	title: {
		float: 'left',
		margin: 0,
	},
	button: {
		float: 'right',
		'&:hover': {
			backgroundColor: '#d11a2a',
			color: 'white',
		},
	},
}));

export default withDialog;
