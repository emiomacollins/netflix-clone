import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { MovieCategory } from '../../constants/home/types';
import MovieThumbnail from '../MovieThumbnail';

interface Props extends MovieCategory {
	id?: string;
}

export default function Category(category: Props) {
	const { id, title, movies } = category;
	// styled components has a ref bug that hasn't been fixed.
	// that's the reason for the any type
	const galleryRef = useRef<HTMLDivElement>(null);
	const [isScrollable, setIsScrollable] = useState(false);

	function handleScroll(increment: number) {
		const widthOfVisibleSlider = galleryRef.current?.offsetWidth || 0;
		const currentScrollPosition = galleryRef.current?.scrollLeft || 0;

		const scrollTo = currentScrollPosition + increment * widthOfVisibleSlider;

		galleryRef.current?.scrollTo({
			behavior: 'smooth',
			left: scrollTo,
		});
	}

	useEffect(() => {
		const containerWidth = galleryRef.current?.clientWidth;
		const scrollWidth = galleryRef.current?.scrollWidth;
		if (!scrollWidth || !containerWidth) return;
		setIsScrollable(scrollWidth > containerWidth);
	}, [category]);

	return (
		<Container id={id}>
			<Heading>{title}</Heading>

			<GalleryContainer>
				<LeftBtn onClick={() => handleScroll(-1)} isScrollable={isScrollable}>
					<BtnIcon as={ChevronLeftIcon} />
				</LeftBtn>

				<Gallery ref={galleryRef as any}>
					{movies?.map((movie) => {
						return (
							<MovieThumbnail
								key={movie.id}
								movie={movie}
								optimized={true}
							/>
						);
					})}
				</Gallery>

				<RightBtn onClick={() => handleScroll(1)} isScrollable={isScrollable}>
					<BtnIcon as={ChevronRightIcon} />
				</RightBtn>
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
	isScrollable: boolean;
}

const navigationBtnStyles = css<NavigationBtnProps>`
	border: 0;
	background: transparent;
	color: inherit;
	padding: 0 0.75rem;

	position: absolute;
	top: 50%;
	height: calc(100% - (2 * var(--gallery-padding-block)) + 2px);
	transform: translateY(-50%);
	z-index: 3;

	opacity: 0;
	transition: 0.2s;

	&:hover {
		background: var(--dark-transparent);
	}

	${(p) =>
		!p.isScrollable &&
		css`
			opacity: 0 !important;
		`}
`;

const LeftBtn = styled.button`
	${navigationBtnStyles}
	left: 0;
`;

const RightBtn = styled.button`
	${navigationBtnStyles}
	right: 0;
`;

const BtnIcon = styled.div`
	height: var(--size-700);
`;

const GalleryContainer = styled.div`
	position: relative;
	overflow-x: hidden;

	&:hover {
		${LeftBtn} {
			opacity: 1;
		}
		${RightBtn} {
			opacity: 1;
		}
	}
`;

const Gallery = styled.div`
	padding-block: var(--gallery-padding-block); // FIX overflow hidden on hover
	display: flex;
	gap: 0.5rem;
	overflow-x: scroll;
	align-items: center;
	overscroll-behavior-inline: contain;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${Breakpoints.tabletUp} {
		gap: 1rem;
	}
`;
