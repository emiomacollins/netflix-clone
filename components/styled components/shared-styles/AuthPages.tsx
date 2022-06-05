import styled from 'styled-components';
import { Breakpoints } from '../../../constants/breakpoints';
import { Button } from '../Button';
import { contentStyles } from '../Content';
import { Overlay } from '../Overlay';

export const Container = styled.div`
	min-height: 100vh;
	display: grid;
	align-items: center;
	background: var(--black);
	padding-block: 10rem 25rem;

	@media ${Breakpoints.tabletUp} {
		padding-block: 10rem 15rem;
		background: transparent;
	}
`;

export const StyledOverlay = styled(Overlay)`
	z-index: -1;
`;

export const BgImage = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;

	img {
		object-fit: cover;
	}
`;

export const Heading = styled.h2`
	font-size: var(--size-650);
	font-weight: 600;
`;

export const Form = styled.form`
	${contentStyles}
	display: grid;
	gap: 3rem;
	max-width: 450px;
	padding: 1rem;

	@media ${Breakpoints.tabletUp} {
		border-radius: var(--radius-500);
		background: var(--black-transparent);
		padding: 5rem 5.5rem;
	}
`;

export const Inputs = styled.div`
	display: grid;
	gap: 1.5rem;
`;

export const Text = styled.p`
	color: var(--gray);
`;

export const SubmitBtn = styled(Button)`
	padding-block: 0.8em;
`;
