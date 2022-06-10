import { ButtonHTMLAttributes, Fragment, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Spinner from './Spinner';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: 'transparent' | 'gray' | 'red';
	isLoading?: boolean;
	children?: ReactNode;
	icon?: boolean;
	toolTip?: string;
}

export default function Button(props: Props) {
	const { isLoading, children, toolTip } = props;
	return (
		<Container {...props}>
			{isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					{toolTip && <ToolTip>{toolTip}</ToolTip>}
					{children}
				</Fragment>
			)}
		</Container>
	);
}

const ToolTip = styled.div`
	position: absolute;
	top: -2em;
	left: 50%;
	transform: translateX(-50%);
	background: var(--light);
	opacity: 0;
	transition: 0.2s;
`;

const Container = styled.button<Props>`
	position: relative;
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
		${ToolTip} {
			opacity: 1;
		}
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
        
	${(p) =>
		p.icon &&
		css`
			background: var(--gray-dark-transparent);
			border-radius: 50%;
			display: grid;
			place-content: center;
			border: 2.5px solid var(--gray-mid);
			padding: 0.5em;
			transition: 0.2s;

			&:active {
				transform: scale(0.9);
			}

			&:hover {
				border-color: var(--light);
				opacity: 1;
				background: transparent;
			}
		`}
`;
