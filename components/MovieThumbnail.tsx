import Image from 'next/image';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Movie } from '../constants/home/types';
import { TMDB_IMAGE_BASE_URL } from '../constants/urls/apis';
import { setModalMovie } from '../lib/redux/slices/ui/uiSlice';

interface Props {
	movie: Movie;
	className?: string;
}

export default function MovieThumbnail({ movie, className }: Props) {
	const dispatch = useDispatch();
	const { id, backdrop_path, poster_path } = movie;

	function handleSetModalMovie() {
		dispatch(setModalMovie(movie));
	}

	// TODO: add loading animation

	return (
		<Container key={id} onClick={handleSetModalMovie} className={className}>
			<Image
				src={`${TMDB_IMAGE_BASE_URL}/w500${backdrop_path || poster_path}`}
				alt=''
				layout='fill'
			/>
		</Container>
	);
}

const Container = styled.button`
	position: relative;
	min-width: 250px;
	aspect-ratio: 16/9;
	border-radius: 0;
	border: 0;
	background: transparent;
	transition: 0.2s;
	overflow: hidden;
	background: var(--black);

	&:hover {
		transform: scale(1.05);
	}

	img {
		object-fit: cover;
		object-position: top;
	}
`;
