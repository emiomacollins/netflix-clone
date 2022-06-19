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
	// category could be null & media_type could not exist in that case use /movie
	/* a senario would be in the default home route (category will be undefined) 
       default routes array uses `/discover/movie` for most routes in getServerSideProps 
       because `/discover/all` is not allowed */

	const url = `${category || media_type || 'movie'}/${id}?append_to_response=videos`;
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
