import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getModalMovie } from '../redux/slices/ui/uiSlice';
import { Overlay } from './styled components/Overlay';

export default function Modal() {
	const modalMovie = useSelector(getModalMovie);

	useEffect(() => {
		document.documentElement.style.overflow = modalMovie ? 'hidden' : 'unset';
	}, [modalMovie]);

	return <Container>{JSON.stringify(modalMovie)}</Container>;
}

const Container = styled(Overlay)`
	display: grid;
	place-content: center;
`;
