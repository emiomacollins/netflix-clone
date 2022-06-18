import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { Movie, MovieCategory } from '../../constants/home/types';
import { TMDB_IMAGE_BASE_URL } from '../../constants/urls/apis';
import { setModalMovie } from '../../lib/redux/slices/ui/uiSlice';

interface Props extends MovieCategory {
	id?: string;
}

export default function Category({ id, title, movies }: Props) {
	const galleryRef = useRef<HTMLDivElement | any>();
	const dispatch = useDispatch();
	const [scrollPosition, setScrollPosition] = useState(0);
	const maxScrollPosition =
		galleryRef.current?.scrollWidth - galleryRef.current?.offsetWidth;

	function handleScroll(increment: number) {
		const widthOfVisibleSlider = galleryRef.current?.offsetWidth;
		const currentScrollPosition = galleryRef.current?.scrollLeft;
		const scrollTo = currentScrollPosition + increment * widthOfVisibleSlider;
		console.dir(galleryRef.current);
		setScrollPosition(scrollTo);
		galleryRef.current?.scrollTo({
			behavior: 'smooth',
			left: scrollTo,
		});
	}

	function handleSetModalMovie(movie: Movie) {
		dispatch(setModalMovie(movie));
	}

	return (
		<Container id={id}>
			<Heading>{title}</Heading>

			<GalleryContainer>
				<LeftNavigationBtn
					onClick={() => handleScroll(-1)}
					visible={scrollPosition > 0}
				>
					<NavigationBtnIcon as={ChevronLeftIcon} />
				</LeftNavigationBtn>

				<Gallery ref={galleryRef}>
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

				<RightNavigationBtn
					onClick={() => handleScroll(1)}
					visible={scrollPosition <= maxScrollPosition}
				>
					<NavigationBtnIcon as={ChevronRightIcon} />
				</RightNavigationBtn>
			</GalleryContainer>
		</Container>
	);
}

const Container = styled.div`
	--gallery-padding-block: 1rem;
	display: grid;
`;

const Heading = styled.h2`
	font-weight: 700;
`;

interface NavigationBtnProps {
	visible: boolean;
}

const navigationBtnStyles = css<NavigationBtnProps>`
	border: 0;
	background: transparent;
	position: absolute;
	color: inherit;
	top: 50%;
	opacity: 1; //always show on mobile
	z-index: 3;
	padding: 0 0.5rem;
	height: calc(100% - (2 * var(--gallery-padding-block)) + 2px);
	transform: translateY(-50%);
	transition: 0.2s;

	&:hover {
		background: var(--dark-transparent);
	}

	${(p) =>
		!p.visible &&
		css`
			opacity: 0 !important;
			pointer-events: none;
		`}

	@media ${Breakpoints.tabletUp} {
		opacity: 0; // only show when hovering on desktop
		padding: 0;
	}
`;

const LeftNavigationBtn = styled.button`
	${navigationBtnStyles}
	left: 0;
`;

const RightNavigationBtn = styled.button`
	${navigationBtnStyles}
	right: 0;
`;

const NavigationBtnIcon = styled.div`
	height: var(--size-700);
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
	padding-block: var(--gallery-padding-block); // FIX overflow hidden on hover
	display: flex;
	gap: 0.5rem;
	width: 100%;
	overflow-x: hidden;

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
	border-radius: 0;
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

	@media ${Breakpoints.tabletUp} {
		border-radius: var(--radius-300);
	}
`;
