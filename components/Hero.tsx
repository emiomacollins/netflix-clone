import Image from 'next/image';
import { useMemo } from 'react';
import styled from 'styled-components';
import { imageURL } from '../constants/api';
import { Breakpoints } from '../constants/breakpoints';
import { Movie } from '../pages/types';
import { containerStyles } from './styled components/Container';

interface Props {
	netflixOriginals: [Movie];
}

export default function Hero({ netflixOriginals }: Props) {
	const randomMovie = useMemo(() => {
		const randomIndex = Math.floor(Math.random() * netflixOriginals.length);
		return netflixOriginals[randomIndex];
	}, [netflixOriginals]);

	const { backdrop_path, poster_path, title, name, original_name, overview } =
		randomMovie;

	return (
		<Container>
			<BgImage>
				<Image
					layout='fill'
					src={`${imageURL}${backdrop_path || poster_path}`}
					alt=''
				/>
			</BgImage>

			<Content>
				<Heading>{title || name || original_name}</Heading>
				<Overview>{overview}</Overview>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), var(--dark));
	--mobile-height: 70vh;
`;

const Content = styled.div`
	${containerStyles}
	padding: 10rem 3rem 20rem;
	display: grid;
	align-content: center;
	min-height: calc(var(--mobile-height) + 1px);
	text-shadow: 1px 1px var(--dark-transparent);

	@media ${Breakpoints.tabletUp} {
		min-height: 100vh;
		padding-inline: 5rem;
	}
`;

// when using layout: fill you have to create a container to style the image
// or else next js will do it for you.
// and make your image absolute and cover the width & height if the container you specify
const BgImage = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: var(--mobile-height);
	z-index: -2;

	img {
		object-fit: cover;
		object-position: top;
	}

	@media ${Breakpoints.tabletUp} {
		height: 100vh;
	}
`;

const Heading = styled.h1`
	font-size: clamp(3rem, 4vw, 10rem);
	max-width: 80rem;
`;

const Overview = styled.p`
	font-size: clamp(var(--size-400), 2vw, var(--size-600));
	max-width: 60rem;
`;
