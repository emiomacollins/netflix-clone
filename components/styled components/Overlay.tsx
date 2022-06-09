import styled from 'styled-components';

interface Props {
	opacity?: number;
}

export const Overlay = styled.div<Props>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${(p) =>
		p.opacity ? `rgba(0, 0, 0, ${p.opacity})` : 'var(--dark-transparent)'};
`;
