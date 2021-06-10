/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL; // the prefix of the URL
axios.defaults.headers.get['Accept'] = 'application/json'; // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'; // default header for all POST request

const handleRequest = (request: AxiosRequestConfig) => {
	return request;
};

const hanldeResponse = (response: AxiosResponse) => {
	return response;
};

const handleError = (error: any) => {
	alert(error);
	throw Promise.reject(error);
};

export class Http {
	instance: AxiosInstance;

	constructor(options?: AxiosRequestConfig) {
		this.instance = axios.create(options);
	}

	static getInstance(options?: AxiosRequestConfig) {
		const http = new Http(options);
		return http.init();
	}

	init() {
		this.instance.interceptors.request.use(handleRequest, handleError);
		this.instance.interceptors.response.use(hanldeResponse, handleError);
		return this.instance;
	}
}
