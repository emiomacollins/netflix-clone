import styled, { css } from 'styled-components';

interface Props {
	error?: boolean;
}

export const Textbox = styled.input<Props>`
	padding: 0.9em;
	border-radius: var(--radius-300);
	border: 0;
	background: var(--gray-dark);
	color: var(--light);
	outline: none;
	min-width: 0;

	${(p) =>
		p.error &&
		css`
			border-bottom: 2px solid var(--error);
		`}

	&:focus {
		background: var(--gray-mid);
	}
`;
