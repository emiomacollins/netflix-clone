import styled, { css } from 'styled-components';

interface Props {
	transparent?: boolean;
	gray?: boolean;
}

export const Button = styled.button<Props>`
	background: var(--light);
	color: var(--dark);
	border-radius: var(--radius-300);
	border: 0;
	padding: 0.5em 1.4em;
	white-space: nowrap;
	transition: 0.2s;

	&:hover {
		opacity: 0.8;
	}

	${(p) =>
		p.transparent &&
		css`
			background: transparent;
			color: var(--light);
		`}
	${(p) =>
		p.gray &&
		css`
			background: var(--gray-transparent);
			color: var(--white);
		`}
`;
