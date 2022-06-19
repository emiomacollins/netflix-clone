import { Movie } from '../../constants/home/types';
import { baseAxios } from '../../lib/axios/config';

interface Video {
	key: string;
	type: 'Trailer' | 'Bloopers' | 'Behind the Scenes';
}

interface Genre {
	id: number;
	name: string;
}

export async function fetchExtraInfo(
	movie: Movie,
	mediaType: string | string[] | undefined
) {
	const { id } = movie;
	const url = `${mediaType}/${id}?append_to_response=videos`;
	const { data } = await baseAxios(url);

	const genres: Genre[] = data.genres;
	const video: Video = data.videos.results.find(
		({ type }: Video) => type === 'Trailer'
	);

	return {
		video,
		genres,
	};
}
