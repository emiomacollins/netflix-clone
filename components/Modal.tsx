import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { getModalMovie, setModalMovie } from '../redux/slices/ui/uiSlice';
import { Content } from './styled components/Content';
import { Overlay } from './styled components/Overlay';

export default function Modal() {
	const modalMovie = useSelector(getModalMovie);
	const dispatch = useDispatch();

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
		<StyledOverlay opacity={0.9} visible={!!modalMovie} onClick={handleClose}>
			<Content onClick={stopPropagation}>{JSON.stringify(modalMovie)}</Content>
		</StyledOverlay>
	);
}

interface Props {
	visible: boolean;
}

const StyledOverlay = styled(Overlay)<Props>`
	display: grid;
	place-content: center;
	z-index: 99;
	opacity: 0;
	pointer-events: none;
	transition: 0.2s;

	${(p) =>
		p.visible &&
		css`
			opacity: 1;
			pointer-events: visible;
		`};
`;
