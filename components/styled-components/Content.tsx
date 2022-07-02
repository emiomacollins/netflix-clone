import styled, { css } from 'styled-components';

export const contentWidthPercent = 93;

export const contentStyles = css`
	width: ${contentWidthPercent}%;
	max-width: 1900px;
	margin-inline: auto;
`;

export const Content = styled.div`
	${contentStyles}
`;
