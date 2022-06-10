import styled from 'styled-components';

interface Props {
	gap?: number;
}

export const Grid = styled.div<Props>`
	display: grid;
	gap: ${(p) => p.gap ?? 1}rem;
`;
