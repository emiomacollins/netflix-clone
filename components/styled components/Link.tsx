import styled from 'styled-components';

interface Props {
	color?: string;
}

export const Link = styled.a<Props>`
	color: var(--${(p) => p.color || 'white'});
	font-weight: 500;
	white-space: nowrap;

	:hover {
		text-decoration: underline;
	}
`;
