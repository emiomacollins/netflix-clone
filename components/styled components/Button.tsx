import styled, { css } from 'styled-components';

interface Props {
	color?: 'transparent' | 'gray' | 'red';
}

export const Button = styled.button<Props>`
	background: var(--light);
	color: var(--dark);
	border-radius: var(--radius-300);
	border: 0;
	padding: 0.5em 1.4em;
	white-space: nowrap;
	transition: 0.2s;
	font-weight: 500;

	&:hover {
		opacity: 0.9;
	}

	${(p) =>
		p.color === 'transparent' &&
		css`
			background: transparent;
			color: var(--light);
		`}
	${(p) =>
		p.color === 'gray' &&
		css`
			background: var(--gray-transparent);
			color: var(--white);
		`}
	${(p) =>
		p.color === 'red' &&
		css`
			background: var(--red);
			color: var(--white);
		`}
`;
