import { useLoading } from "@agney/react-loading";

const Loader = () => {
	const { containerProps, indicatorEl } = useLoading({
		loading: true,
	});

	return <section {...containerProps} style={{ width: 50, position: 'absolute', top: '50%', left: '50%' }} >{indicatorEl}</section>;
};

export default Loader;
