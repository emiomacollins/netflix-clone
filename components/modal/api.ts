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
	// try to get category (media_type) from url queryParam first
	// media_type does not get included if modalMovie was gotten from a path that isn't '/all'
	// category & media_type could both be null. in that case use movie
	const mediaType = category || media_type || 'movie';

	async function fetchInfo(category: string | string[] | undefined) {
		const url = `${category}/${id}?append_to_response=videos`;
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

	// if both are null and movie fails to fetch it means it is a tv-show
	return await fetchInfo(mediaType).catch(async () => await fetchInfo('tv'));
}
