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
	category: string | string[] | undefined
) {
	const { id, media_type } = movie;
	// try to get category (media_type) from url first
	// media_type does not get included if modalMovie was gotten from a path that isn't '/all'
	const url = `${category || media_type}/${id}?append_to_response=videos`;
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
