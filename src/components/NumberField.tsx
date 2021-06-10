import { TextField } from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';

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
	const isValid = (value: string) => {
		const result = value.match(pattern);
        return result;
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					{...rest}
					value={value}
					onChange={(e) => {
						e.preventDefault();
						if (isValid(e.target.value)) {
							onChange(e);
						}
					}}
					error={!!error}
					helperText={error?.message}
				/>
			)}
		/>
	);
};

export default NumberField;
