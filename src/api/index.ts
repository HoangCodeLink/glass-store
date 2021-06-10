import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Http } from '../utils/http';

export const get = async <T>(
	url: string,
	params?: any,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	const response = await Http.getInstance().get<T>(url, {
		...options,
		params,
	});
	return response;
};

export const post = async <T>(
	url: string,
	data?: any,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	const response = await Http.getInstance().post<T>(url, data, options);
	return response;
};

export const put = async <T>(
	url: string,
	data?: any,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	const response = await Http.getInstance().put<T>(url, data, options);
	return response;
};

export const patch = async <T>(
	url: string,
	data?: any,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	const response = await Http.getInstance().patch<T>(url, data, options);
	return response;
};

export const remove = async <T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	const response = await Http.getInstance().delete<T>(url, config);
	return response;
};
