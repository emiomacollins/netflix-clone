import styled, { css } from 'styled-components';

interface Props {
	error?: boolean;
}

export const Textbox = styled.input<Props>`
	padding: 0.8em 1em;
	border-radius: var(--radius-300);
	border: 0;
	background: var(--gray-dark);
	color: var(--light);
	outline: none;
	${(p) =>
		p.error &&
		css`
			border-bottom: 2px solid var(--error);
		`}

	&:focus {
		background: var(--gray-mid);
	}
`;
