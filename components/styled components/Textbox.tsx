import styled from 'styled-components';

export const Textbox = styled.input`
	padding: 0.8em 1em;
	border-radius: var(--radius-300);
	border: 0;
	background: var(--gray-dark);
	color: var(--light);
	outline: none;

	&:focus {
		background: var(--gray-mid);
	}
`;
