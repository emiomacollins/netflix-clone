import { Movie } from '../../constants/home/types';
import { baseAxios } from '../../lib/axios/config';

export interface Data {
	page: number;
	results: Movie[];
	total_results: number;
}

export default async function searchMovie(
	query: string | string[] | undefined
): Promise<Movie[]> {
	const url = `search/multi?query=${query}`;
	const maxTotalPages = 2;

	const { data } = await baseAxios.request<Data>({
		url,
	});

	let totalPages = Math.ceil(data.total_results / 20);
	totalPages = totalPages > maxTotalPages ? maxTotalPages : totalPages;
	const otherPagesLength = totalPages - 1;

	const otherPagesRoutes = Array(otherPagesLength > 0 ? otherPagesLength : 0)
		.fill(0)
		.map((_, i) => `${url}&page=${i + 2}`);

	const otherPagesResult = await Promise.all(
		otherPagesRoutes.map((route) => baseAxios.request<Data>({ url: route }))
	);

	const otherPages = otherPagesResult.map(({ data: { results } }) => results);

	return [...data.results, ...otherPages.flat()];
}
