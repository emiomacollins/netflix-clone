import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Spinner from './Spinner';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: 'transparent' | 'gray' | 'red';
	isLoading?: boolean;
	children?: ReactNode;
}

export default function Button(props: Props) {
	const { isLoading, children } = props;
	return <Container {...props}>{isLoading ? <Spinner /> : children}</Container>;
}

const Container = styled.button<Props>`
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
