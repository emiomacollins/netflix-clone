import { InformationCircleIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { Movie } from '../../constants/home/types';
import { TMDB_IMAGE_BASE_URL } from '../../constants/urls/apis';
import { setModalMovie } from '../../lib/redux/slices/ui/uiSlice';
import Button from '../styled components/Button';
import { contentStyles } from '../styled components/Content';
import { flexStyles } from '../styled components/Flex';

interface Props {
	randomMovie: Movie;
}

export default function Hero({ randomMovie }: Props) {
	const dispatch = useDispatch();

	const { backdrop_path, poster_path, title, name, original_name, overview } =
		randomMovie;

	function handlePlay() {
		dispatch(setModalMovie(randomMovie));
	}

	return (
		<Container>
			<BgImage>
				<Image
					priority
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
					<StyledButton onClick={handlePlay}>
						<Icon as={PlayIcon} />
						Play
					</StyledButton>
					<StyledButton color='gray' onClick={handlePlay}>
						<Icon as={InformationCircleIcon} /> More Info
					</StyledButton>
				</Buttons>
			</Content>
		</Container>
	);
}

const Container = styled.div``;

const Content = styled.div`
	${contentStyles}
	--padding-bottom:clamp(7rem, 20vw, 10rem);
	--padding-top: clamp(10rem, 25vw, 15rem);
	padding-block: var(--padding-top) var(--padding-bottom);
	display: grid;
	gap: 1.5rem;

	@media ${Breakpoints.desktopUp} {
		--padding-bottom: clamp(10rem, 25vw, 20rem);
		--padding-top: clamp(15rem, 35vw, 25rem);
	}
`;

const BgContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 80vh;
	z-index: -1;
	min-height: 700px;

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
	line-height: 1;

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

const Icon = styled.div`
	height: var(--size-600);
`;

const Buttons = styled.div`
	${flexStyles}
	gap: 1.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;

	@media ${Breakpoints.tabletUp} {
		gap: 2rem;
	}
`;

const StyledButton = styled(Button)`
	${flexStyles}
	font-size: var(--size-500);
`;
