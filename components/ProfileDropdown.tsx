import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import ProfileIconPath from '../assets/images/profileIcon.jpg';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';
import { useToggle } from '../hooks/useToggle';
import { flexStyles } from './styled components/Flex';

export default forwardRef(function ProfileDropdown() {
	const { state: expanded, toggle: toggleExpanded, ref } = useToggle();
	const propExpanded = expanded ? 'true' : undefined;

	return (
		<Container ref={ref}>
			<Toggle onClick={toggleExpanded}>
				<ProfileIcon>
					<Image src={ProfileIconPath} alt='' />
				</ProfileIcon>
				<ChevronIcon expanded={propExpanded} />
			</Toggle>

			<Dropdown expanded={propExpanded}>
				<Option>
					<Link href={routes.account}>Account</Link>
				</Option>
				<Option>
					<Link href={routes.login}>Sign out</Link>
				</Option>
			</Dropdown>
		</Container>
	);
});

const Container = styled.div`
	position: relative;
`;

const Toggle = styled.button`
	${flexStyles}
	gap: .5rem;
	background: transparent;
	border: 0;
	color: var(--light);
`;

const ProfileIcon = styled.div`
	cursor: pointer;
	width: var(--size-650);
	display: flex;

	img {
		border-radius: var(--radius-300);
	}
`;

interface Props {
	expanded: string | undefined;
}

const ChevronIcon = styled(ChevronDownIcon)<Props>`
	width: var(--size-400);
	aspect-ratio: 1;
	transition: 0.2s;
	transform: rotate(${(p) => (p.expanded ? 180 : 0)}deg);
`;

const Dropdown = styled.div<Props>`
	position: absolute;
	top: 150%;
	right: 0;
	background: var(--dark);
	border: 1px solid var(--gray-transparent-200);
	width: max-content;
	transition: 0.2s;
	opacity: 0;
	pointer-events: none;

	${(p) =>
		p.expanded &&
		css`
			opacity: 1;
			pointer-events: visible;
		`}
`;

const Option = styled.div`
	padding: 0.5em 1.5em;
	cursor: pointer;

	&:hover {
		background: var(--gray-dark-transparent);
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--gray-transparent-200);
	}

	@media ${Breakpoints.tabletUp} {
		font-size: var(--size-350);
	}
`;
