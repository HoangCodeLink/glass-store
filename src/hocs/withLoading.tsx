import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { loadingSelector } from '../reducers';

const withLoading = <T extends {}>(WrappedComponent: ComponentType<T>) => {
	const WithLoading = (props: T) => {
		const loading = useSelector(loadingSelector);
		return loading > 0 ? <Loader /> : <WrappedComponent {...props} />;
	};

	WithLoading.displayName = `WithLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
	return WithLoading;
};

export default withLoading;
