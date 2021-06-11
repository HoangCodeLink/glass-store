import { TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
import { isValid } from '../utils/stringHelper';
interface Props {
	name: string,
	control: Control<any>,
	defaultValue?: any,
	pattern?: RegExp,
	[x: string]: any
}

const NumberField = ({
	name,
	control,
	defaultValue = '',
	pattern = /^((0|([1-9][0-9]*))(\.[0-9]*)?)?$/,
	...rest
}: Props) => {
	const handleChange = (e: ChangeEvent<any>, onChange: (...events: any[]) => void) => {
		e.preventDefault();
		if (isValid(e.target.value, pattern)) {
			onChange(e);
		}
	}

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					{...rest}
					value={value}
					onChange={(e) => handleChange(e, onChange)}
					error={!!error}
					helperText={error?.message}
				/>
			)}
		/>
	);
};

export default NumberField;
