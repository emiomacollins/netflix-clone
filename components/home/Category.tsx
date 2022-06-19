import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { MovieCategory } from '../../constants/home/types';
import MovieThumbnail from '../MovieThumbnail';

interface Props extends MovieCategory {
	id?: string;
}

export default function Category({ id, title, movies }: Props) {
	const galleryRef = useRef<any>();
	const [scrollPosition, setScrollPosition] = useState(0);
	const maxScrollPosition =
		galleryRef.current?.scrollWidth - galleryRef.current?.offsetWidth;

	function handleScroll(increment: number) {
		const widthOfVisibleSlider = galleryRef.current?.offsetWidth;
		const currentScrollPosition = galleryRef.current?.scrollLeft;
		const scrollTo = currentScrollPosition + increment * widthOfVisibleSlider;
		galleryRef.current?.scrollTo({
			behavior: 'smooth',
			left: scrollTo,
		});
	}

	function updateScrollPosition() {
		setScrollPosition(galleryRef.current?.scrollLeft);
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

				<Gallery ref={galleryRef} onScroll={updateScrollPosition}>
					{movies?.map((movie) => {
						return <MovieThumbnail key={movie.id} movie={movie} />;
					})}
				</Gallery>

				<RightNavigationBtn
					onClick={() => handleScroll(1)}
					visible={scrollPosition < maxScrollPosition}
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
	position: absolute;
	color: inherit;
	top: 50%;
	z-index: 3;
	height: calc(100% - (2 * var(--gallery-padding-block)) + 2px);
	padding: 0 0.75rem;
	opacity: 1; //always show on mobile
	/* background: var(--dark-transparent); */
	background: transparent;
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
		background: transparent;
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
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${Breakpoints.tabletUp} {
		gap: 1rem;
		overflow-x: scroll;
	}
`;
