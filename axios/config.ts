import axios from 'axios';
import { TMDB_BASE_URL } from '../constants/urls/apis';

const baseAxios = axios.create({
	baseURL: TMDB_BASE_URL,
});

baseAxios.interceptors.request.use((config) => {
	config.params = {
		...config.params,
		api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
		language: 'en-US',
	};
	return config;
});

export { baseAxios };
