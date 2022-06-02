import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/';
export const imageURL = `https://image.tmdb.org/t/p/original/`;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const language = 'en-US';

const baseAxios = axios.create({
	baseURL,
});

baseAxios.interceptors.request.use((config) => {
	config.params = {
		...config.params,
		api_key: API_KEY,
		language,
	};
	return config;
});

export { baseAxios };
