import {
	CheckIcon,
	PlusIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from '@heroicons/react/solid';
import { MouseEvent, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { YOUTUBE_VIDEO_BASE_URL } from '../../constants/urls/apis';
import { useMyList } from '../../hooks/useMyList';
import { useToggle } from '../../hooks/useToggle';
import { getModalMovie, setModalMovie } from '../../lib/redux/slices/ui/uiSlice';
import Button from '../styled components/Button';
import { contentStyles } from '../styled components/Content';
import { Flex, flexStyles } from '../styled components/Flex';
import { Grid } from '../styled components/Grid';
import { Overlay } from '../styled components/Overlay';
import { fetchExtraInfo } from './api';

export default function Modal() {
	const dispatch = useDispatch();
	const modalMovie = useSelector(getModalMovie);
	const visible = !!modalMovie;
	const { state: muted, toggle: toggleMuted } = useToggle();

	const {
		query: { data: myList, isLoading: loadingMyList },
		toggleMutation: { mutate: toggleFromListMutation, isLoading: togglingFromList },
	} = useMyList();

	const { data: extraInfo } = useQuery(`fetchExtraInfo-${modalMovie?.id}`, () =>
		visible ? fetchExtraInfo(modalMovie) : null
	);

	const { video, genres } = extraInfo || {};
	const {
		vote_average = 0,
		first_air_date,
		release_date,
		overview,
		original_language,
		vote_count,
	} = modalMovie || {};
	const percentageMatch = vote_average * 10;
	const isInMyList = useMemo(
		() => (myList?.find(({ id }) => id === modalMovie?.id) ? true : false),
		[modalMovie?.id, myList]
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
				<CloseBtn color='transparent' onClick={handleClose}>
					<CloseIcon />
				</CloseBtn>

				<VideoContainer>
					<ReactPlayer
						url={`${YOUTUBE_VIDEO_BASE_URL}${video?.key}`}
						playing
						width={'100%'}
						height={'100%'}
						muted={muted}
					/>

					<Buttons>
						<Button icon onClick={toggleMuted}>
							<Icon as={muted ? VolumeOffIcon : VolumeUpIcon} />
						</Button>

						{!loadingMyList && modalMovie && (
							<Button
								icon
								toolTip={isInMyList ? 'Remove from List' : 'Add to List'}
								onClick={() => toggleFromListMutation(modalMovie)}
								disabled={togglingFromList}
							>
								{isInMyList ? (
									<Icon as={CheckIcon} />
								) : (
									<Icon as={PlusIcon} />
								)}
							</Button>
						)}
					</Buttons>
				</VideoContainer>

				<Text>
					<Grid gap={2}>
						<Flex>
							{/* to fix color change when closing modal */}
							{!!percentageMatch && (
								<MatchPercentage percentage={percentageMatch}>
									{percentageMatch}% Match
								</MatchPercentage>
							)}
							{release_date || first_air_date}
							<Badge>HD</Badge>
						</Flex>

						<Columns>
							<p>{overview}</p>
							<Grid>
								<p>
									<Accent>Genres: </Accent>
									{genres?.map(({ name }) => name).join(', ')}
								</p>
								<p>
									<Accent>Original Language: </Accent>
									{original_language}
								</p>
								<p>
									<Accent>Total Votes: </Accent>
									{vote_count?.toLocaleString()}
								</p>
							</Grid>
						</Columns>
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
	transition: 0.15s;
	overflow: auto;

	${(p) =>
		p.visible &&
		css`
			opacity: 1;
			pointer-events: visible;
		`};

	@media ${Breakpoints.tabletDown} {
		display: grid;
		align-items: center;
	}
`;

const Content = styled.div<Props>`
	${contentStyles}
	position: relative;
	max-width: 950px;
	background: var(--dark);
	border-radius: var(--radius-400);
	margin-block: 3rem 2rem;
	opacity: 0;
	transform: scale(0.9);
	transition: 0.2s;
	font-size: var(--size-350);
	letter-spacing: 0.03em;
	overflow: hidden;

	${(p) =>
		p.visible &&
		css`
			opacity: 1;
			transform: scale(1);
		`}
`;

const CloseBtn = styled(Button)`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	border-radius: 50%;
	background: var(--dark);
	display: grid;
	place-content: center;
	padding: 0.7em;
	z-index: 1;

	&:hover {
		transform: scale(1.15);
	}

	@media ${Breakpoints.tabletUp} {
		top: 1rem;
		right: 1.5rem;
	}
`;

const CloseIcon = styled(XIcon)`
	width: var(--size-500);
	aspect-ratio: 1;
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

const Icon = styled.div.attrs(() => ({ color: 'var(--light)' }))`
	width: var(--size-500);
`;

const Text = styled.div`
	font-weight: 300;
	padding: 2rem;

	@media ${Breakpoints.tabletUp} {
		padding: 3rem 3.5rem;
	}
`;

interface MatchPercentageProps {
	percentage: number;
}

const MatchPercentage = styled.p<MatchPercentageProps>`
	font-weight: 500;
	color: var(--${(p) => (p.percentage >= 60 ? 'success' : 'error')});
`;

const Badge = styled.div`
	border: 1.5px solid var(--gray-mid);
	border-radius: var(--radius-400);
	padding-inline: 0.6em;
	letter-spacing: 0.05em;
	font-weight: 400;
	font-size: var(--size-300);
`;

const Columns = styled.div`
	display: grid;
	gap: 2rem;
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-template-columns: 1fr 20%;
		gap: 4rem;
	}
`;

const Accent = styled.span`
	color: var(--gray);
`;
