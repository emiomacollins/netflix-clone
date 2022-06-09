import { baseAxios } from '../../axios/config';
import { Movie } from '../../constants/types';

interface Video {
	key: string;
	type: 'Trailer' | 'Bloopers' | 'Behind the Scenes';
}

interface Genre {
	id: number;
	name: string;
}

export async function fetchExtraInfo(movie: Movie | null) {
	const { media_type, id } = movie || {};

	const url = `${media_type === 'tv' ? 'tv' : 'movie'}/${id}?append_to_response=videos`;

	const { data } = await baseAxios(url);

	const video: Video | null = data.videos.results.find(
		({ type }: Video) => type === 'Trailer'
	);
	const genres: Genre[] = data.genres;

	return {
		video,
		genres,
	};
}
