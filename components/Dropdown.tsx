import { ChevronDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useToggle } from '../hooks/useToggle';
import { flexStyles } from './styled components/Flex';

interface Option {
	label: string;
	route: string;
}

interface Props {
	label: string | ReactNode;
	options: Option[];
	top?: string;
	left?: string;
	right?: string;
}

const Dropdown = ({ label, options, top, left, right }: Props) => {
	const { state: expanded, toggle: toggleExpanded, ref } = useToggle();
	const propsExpanded = expanded ? 'true' : undefined;

	return (
		<Container ref={ref}>
			<Toggle onClick={toggleExpanded}>
				{label}
				<Icon expanded={propsExpanded} />
			</Toggle>
			<Options
				expanded={propsExpanded}
				top={top}
				left={left}
				right={right}
				onClick={toggleExpanded}
			>
				{options.map(({ route, label }) => (
					<Link href={route} key={route}>
						<Option>{label}</Option>
					</Link>
				))}
			</Options>
		</Container>
	);
};

export default Dropdown;

interface ExpandedProps {
	expanded: string | undefined;
}

const Container = styled.div`
	position: relative;
`;

const Toggle = styled.button`
	${flexStyles}
	background: transparent;
	border: 0;
	color: var(--light);
	gap: 0.5rem;
	font-weight: 500;
`;

const Icon = styled(ChevronDownIcon)<ExpandedProps>`
	height: var(--size-400);
	margin-top: 0.2em;
	transition: 0.2s;

	${(p) =>
		p.expanded &&
		css`
			transform: rotate(180deg);
		`}
`;

interface OptionsProps {
	top?: string;
	left?: string;
	right?: string;
}

const Options = styled.div<ExpandedProps & OptionsProps>`
	position: absolute;
	top: ${(p) => p.top || '180%'};
	left: 50%;
	background: var(--black);
	border: 1px solid var(--gray-transparent-200);
	min-width: max-content;
	display: grid;
	opacity: 0;
	transform: scale(0.95);
	transition: 0.2s;
	pointer-events: none;
	border-radius: var(--radius-400);
	overflow: hidden;

	${(p) =>
		!p.left &&
		!p.right &&
		css`
			transform: translateX(-50%);
		`}

	${(p) =>
		p.left &&
		css`
			right: unset;
			left: ${p.left};
		`}
	${(p) =>
		p.right &&
		css`
			left: unset;
			right: ${p.right};
		`}


	${(p) =>
		p.expanded &&
		css`
			opacity: 1;
			pointer-events: visible;
			transform: scale(1);
		`}
`;

const Option = styled.a`
	padding: 0.5em 1.3em;

	&:last-child {
		padding-bottom: 0.8em;
	}

	&:hover {
		background: var(--gray-dark-transparent);
	}
`;
