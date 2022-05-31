import styled, { css } from 'styled-components';

interface Props {
	transparent?: boolean;
}

export const Button = styled.button<Props>`
	background: var(--light);
	color: var(--dark);
	border-radius: var(--radius-300);
	border: 0;
	padding: 0.5rem 1.5rem;

	${(p) =>
		p.transparent &&
		css`
			background: transparent;
			color: var(--light);
		`}
`;
