import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { imageURL } from '../../constants/api';
import { CategoryType } from '../../constants/types';
import { Button } from '../styled components/Button';

export default function Category({ heading, movies }: CategoryType) {
	const SliderRef = useRef<HTMLDivElement | any>(null);

	function handleScroll(increment: number) {
		const widthOfVisibleSlider = SliderRef.current.offsetWidth;
		const currentScrollPosition = SliderRef.current.scrollLeft;
		SliderRef.current?.scrollTo({
			behavior: 'smooth',
			left: currentScrollPosition + increment * widthOfVisibleSlider,
		});
	}

	return (
		<Container>
			<Heading>{heading}</Heading>

			<Gallery>
				<LeftNavigationBtn transparent onClick={() => handleScroll(-1)}>
					<NavigationBtnIcon as={ChevronLeftIcon} />
				</LeftNavigationBtn>

				<Slider ref={SliderRef}>
					{movies.map(({ id, backdrop_path, poster_path }) => (
						<Movie key={id}>
							<Image
								src={`${imageURL}/w500/${backdrop_path || poster_path}`}
								alt=''
								layout='fill'
							/>
						</Movie>
					))}
				</Slider>

				<RightNavigationBtn transparent onClick={() => handleScroll(1)}>
					<NavigationBtnIcon as={ChevronRightIcon} />
				</RightNavigationBtn>
			</Gallery>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;

const Heading = styled.h2`
	font-weight: 500;
`;

const navigationBtnStyles = css`
	--scale: 1;
	position: absolute;
	top: 50%;
	transform: translateY(-50%) scale(var(--scale));
	z-index: 1;
	transition: 0.2s;
	opacity: 0;
	padding: 1rem;
	z-index: 3;

	&:hover {
		--scale: 1.2;
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

const Gallery = styled.div`
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

// to keep the navigation in place (relative to the gallery)
const Slider = styled.div`
	display: flex;
	gap: 1.5rem;
	width: 100%;
	overflow-x: scroll;
	/* FIX FOR: transition: scale on image behaves like it's container has overflow-y: scroll so it cuts out the image on scroll */
	padding: 2rem 0.5rem;

	&::-webkit-scrollbar {
		display: none;
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
