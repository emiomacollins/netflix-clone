import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { Movie, MovieCategory } from '../../constants/home/types';
import { TMDB_IMAGE_BASE_URL } from '../../constants/urls/apis';
import { setModalMovie } from '../../lib/redux/slices/ui/uiSlice';
import Button from '../styled components/Button';

interface Props extends MovieCategory {
	id?: string;
}

export default function Category({ id, title, movies }: Props) {
	const SliderRef = useRef<HTMLDivElement | any>();
	const dispatch = useDispatch();

	function handleScroll(increment: number) {
		const widthOfVisibleSlider = SliderRef.current?.offsetWidth;
		const currentScrollPosition = SliderRef.current?.scrollLeft;
		SliderRef.current?.scrollTo({
			behavior: 'smooth',
			left: currentScrollPosition + increment * widthOfVisibleSlider,
		});
	}

	function handleSetModalMovie(movie: Movie) {
		dispatch(setModalMovie(movie));
	}

	return (
		<Container id={id}>
			<Heading>{title}</Heading>

			<GalleryContainer>
				<LeftNavigationBtn color='transparent' onClick={() => handleScroll(-1)}>
					<NavigationBtnIcon as={ChevronLeftIcon} />
				</LeftNavigationBtn>

				<Gallery ref={SliderRef}>
					{movies?.map((movie) => {
						const { id, backdrop_path, poster_path } = movie;
						return (
							<Movie key={id} onClick={() => handleSetModalMovie(movie)}>
								<Image
									src={`${TMDB_IMAGE_BASE_URL}/w500/${
										backdrop_path || poster_path
									}`}
									alt=''
									layout='fill'
								/>
							</Movie>
						);
					})}
				</Gallery>

				<RightNavigationBtn color='transparent' onClick={() => handleScroll(1)}>
					<NavigationBtnIcon as={ChevronRightIcon} />
				</RightNavigationBtn>
			</GalleryContainer>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;

const Heading = styled.h2``;

const navigationBtnStyles = css`
	--scale: 1;
	position: absolute;
	top: 50%;
	transform: translateY(-50%) scale(var(--scale));
	z-index: 1;
	transition: 0.2s;
	opacity: 1;
	padding: 1rem;
	z-index: 3;

	&:hover {
		--scale: 1.2;
	}

	@media ${Breakpoints.tabletUp} {
		opacity: 0;
	}
`;

const LeftNavigationBtn = styled(Button)`
	${navigationBtnStyles}
	left: 1rem;
`;

const RightNavigationBtn = styled(Button)`
	${navigationBtnStyles}
	right: 0;
`;

const NavigationBtnIcon = styled.div`
	height: 5rem;
`;

const GalleryContainer = styled.div`
	position: relative;
	overflow-x: hidden;

	&:hover {
		${LeftNavigationBtn} {
			opacity: 1;
		}
		${RightNavigationBtn} {
			opacity: 1;
		}
	}
`;

const Gallery = styled.div`
	display: flex;
	gap: 0.5rem;
	width: 100%;
	overflow-x: hidden;

	/* FIX overflow hidden on hover  */
	padding: 1.5rem 0.5rem;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${Breakpoints.tabletUp} {
		gap: 1rem;
		overflow-x: scroll;
	}
`;

const Movie = styled.button`
	position: relative;
	min-width: 250px;
	aspect-ratio: 16/9;
	border-radius: var(--radius-400);
	border: 0;
	background: transparent;
	transition: 0.2s;
	overflow: hidden;

	&:hover {
		transform: scale(1.05);
	}

	img {
		object-fit: cover;
	}
`;
