import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const NumberField = ({
	name,
	control,
	defaultValue = '',
	pattern = /^((0|([1-9][0-9]*))(\.[0-9]*)?)?$/,
	...rest
}) => {
	const isValid = (value) => {
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
