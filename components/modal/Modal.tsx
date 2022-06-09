import { PlusIcon, XIcon } from '@heroicons/react/solid';
import { MouseEvent, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { YOUTUBE_VIDEO_BASE_URL } from '../../constants/urls/apis';
import { getModalMovie, setModalMovie } from '../../redux/slices/ui/uiSlice';
import Button from '../styled components/Button';
import { contentStyles } from '../styled components/Content';
import { flexStyles } from '../styled components/Flex';
import { Grid } from '../styled components/Grid';
import { Overlay } from '../styled components/Overlay';
import { fetchExtraInfo } from './api';

export default function Modal() {
	const modalMovie = useSelector(getModalMovie);
	const dispatch = useDispatch();
	const visible = !!modalMovie;

	const { data } = useQuery(
		`fetchExtraInfo-${modalMovie?.id}`,
		() => fetchExtraInfo(modalMovie),
		{
			enabled: visible,
		}
	);

	useEffect(() => {
		document.documentElement.style.overflow = modalMovie ? 'hidden' : 'unset';
	}, [modalMovie]);

	function handleClose() {
		dispatch(setModalMovie(null));
	}

	function stopPropagation(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
	}

	return (
		<StyledOverlay opacity={0.8} visible={visible} onClick={handleClose}>
			<Content visible={visible} onClick={stopPropagation}>
				<Close color='transparent' onClick={handleClose}>
					<CloseIcon />
				</Close>
				<VideoContainer>
					<ReactPlayer
						url={`${YOUTUBE_VIDEO_BASE_URL}${data?.video?.key}`}
						playing
						width={'100%'}
						height={'100%'}
					/>
					<Buttons>
						<Button icon>
							<Icon as={PlusIcon} color={'var(--light)'} />
						</Button>
					</Buttons>
				</VideoContainer>
				<Text>
					<Grid gap={2}>
						<div>
							<MatchPercentage percentage={10}></MatchPercentage>
						</div>
					</Grid>
				</Text>
			</Content>
		</StyledOverlay>
	);
}

interface Props {
	visible: boolean;
}

const StyledOverlay = styled(Overlay)<Props>`
	z-index: 99;
	opacity: 0;
	pointer-events: none;
	transition: 0.2s;
	overflow: auto;

	${(p) =>
		p.visible &&
		css`
			opacity: 1;
			pointer-events: visible;
		`};
`;

const Content = styled.div<Props>`
	${contentStyles}
	position: relative;
	max-width: 900px;
	background: var(--dark);
	border-radius: var(--radius-400);
	overflow: hidden;
	margin-top: 3rem;
	opacity: 0;
	transform: scale(0.9);
	transition: 0.1s;
	${(p) =>
		p.visible &&
		css`
			opacity: 1;
			transform: scale(1);
		`}
`;

const Close = styled(Button)`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	border-radius: 50%;
	background: var(--dark);
	padding: 0;
	display: grid;
	place-content: center;
	width: 3.5rem;
	aspect-ratio: 1;
	&:hover {
		transform: scale(1.15);
	}

	@media ${Breakpoints.tabletUp} {
		top: 1rem;
		right: 1.5rem;
	}
`;

const CloseIcon = styled(XIcon)`
	width: 2rem;
	height: 2rem;
`;

const VideoContainer = styled.div`
	background: var(--black);
	aspect-ratio: 16/9;
	width: 100%;
	position: relative;
`;

const Buttons = styled.div`
	${flexStyles}
	position: absolute;
	bottom: 2rem;
	left: 0;
	width: 100%;
	padding-inline: 2rem;
`;

const Icon = styled.div`
	width: 2.5rem;
`;

const Text = styled.div`
	padding: 4rem;
	font-weight: 300;
`;

interface MatchPercentageProps {
	percentage: number;
}

const MatchPercentage = styled.p<MatchPercentageProps>`
	font-weight: bold;
	color: var(--${(p) => (p.percentage >= 60 ? 'success' : 'error')});
`;
