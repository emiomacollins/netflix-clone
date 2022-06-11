import { InformationCircleIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { Movie } from '../../constants/types';
import { TMDB_IMAGE_BASE_URL } from '../../constants/urls/apis';
import { setModalMovie } from '../../redux/slices/ui/uiSlice';
import Button from '../styled components/Button';
import { contentStyles } from '../styled components/Content';
import { flexStyles } from '../styled components/Flex';

interface Props {
	netflixOriginals: Movie[] | undefined;
}

export default function Hero({ netflixOriginals = [] }: Props) {
	const dispatch = useDispatch();

	const randomMovie = useMemo(() => {
		const randomIndex = Math.floor(Math.random() * netflixOriginals.length);
		return netflixOriginals[randomIndex];
	}, [netflixOriginals]);

	const { backdrop_path, poster_path, title, name, original_name, overview } =
		randomMovie;

	function handleSetModalMovie() {
		dispatch(setModalMovie(randomMovie));
	}

	return (
		<Container>
			<BgImage>
				<Image
					layout='fill'
					src={`${TMDB_IMAGE_BASE_URL}/original/${
						backdrop_path || poster_path
					}`}
					alt=''
				/>
			</BgImage>
			<Overlay />

			<Content>
				<Heading>{title || name || original_name}</Heading>

				<Overview>{overview}</Overview>

				<Buttons>
					<StyledButton>
						<PlayIcon width={35} />
						Play
					</StyledButton>
					<StyledButton color='gray' onClick={handleSetModalMovie}>
						<InformationCircleIcon width={35} /> More Info
					</StyledButton>
				</Buttons>
			</Content>
		</Container>
	);
}

const Container = styled.div``;

const Content = styled.div`
	${contentStyles}
	--padding-bottom:clamp(7rem, 10vh, 10rem);
	--padding-top: clamp(10rem, 15vh, 15rem);
	padding-block: var(--padding-top) var(--padding-bottom);
	display: grid;
	gap: 2rem;

	@media ${Breakpoints.tabletUp} {
		--padding-bottom: clamp(10rem, 20vh, 20rem);
		--padding-top: clamp(15rem, 25vh, 25rem);
	}
`;

const BgContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 80vh;
	z-index: -1;

	@media ${Breakpoints.tabletUp} {
		height: 100vh;
	}
`;

// when using layout: fill you have to create a container to style the image
// or else next js will do it for you.
// and make your image absolute and cover the width & height if the container you specify
const BgImage = styled.div`
	${BgContainerStyles}

	img {
		object-fit: cover;
		object-position: top;
	}
`;

const Overlay = styled.div`
	${BgContainerStyles}
	background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2), var(--dark));
`;

const Heading = styled.h1`
	font-size: var(--size-700);
	text-shadow: var(--text-shadow);

	@media ${Breakpoints.tabletUp} {
		max-width: 80%;
	}
`;

const Overview = styled.p`
	font-size: var(--size-400);
	text-shadow: var(--text-shadow);

	@media ${Breakpoints.tabletUp} {
		font-size: var(--size-500);
	}

	@media ${Breakpoints.desktopUp} {
		max-width: 50%;
	}
`;

const Buttons = styled.div`
	${flexStyles}
	gap: 2rem;
	flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
	${flexStyles}
	font-size: var(--size-500);
`;
