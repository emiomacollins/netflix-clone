import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Breakpoints } from '../constants/breakpoints';
import { Movie } from '../constants/home/types';
import { TMDB_IMAGE_BASE_URL } from '../constants/urls/apis';
import { setModalMovie } from '../lib/redux/slices/ui/uiSlice';

interface Props {
	movie: Movie;
	className?: string;
}

export default function MovieThumbnail({ movie, className }: Props) {
	const dispatch = useDispatch();
	const { backdrop_path, poster_path } = movie;

	function handleSetModalMovie() {
		dispatch(setModalMovie(movie));
	}

	return (
		<Container onClick={handleSetModalMovie} className={className}>
			<Thumbnail
				src={`${TMDB_IMAGE_BASE_URL}/w500${backdrop_path || poster_path}`}
				alt=''
			/>
		</Container>
	);
}

const Container = styled.button`
	border-radius: 0;
	border: 0;
	transition: 0.2s;
	background: var(--black);
	display: flex;
	overflow: hidden;
	min-width: 250px;
	max-width: 500px;

	&:hover {
		transform: scale(1.05);
	}

	@media ${Breakpoints.tabletUp} {
		border-radius: var(--radius-300);
	}
`;

const Thumbnail = styled.img`
	aspect-ratio: 16/9;
	object-fit: cover;
	object-position: top;
`;
