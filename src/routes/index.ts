import { ComponentType } from 'react';
import DetailsPage from '../pages/DetailsPage';
import HomePage from '../pages/HomePage';

interface Route {
	key: string;
	exact?: boolean;
	path: string;
	component?: ComponentType<any>;
	children?: any;
}

const routes: Route[] = [
	{
        key: 'details',
		path: '/products/:id',
		component: DetailsPage,
	},
	{
        key: 'products',
		path: '/products',
		component: HomePage,
	},
	{
        key: 'home',
		exact: true,
		path: '/',
		component: HomePage,
	},
];

export default routes;