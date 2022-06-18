import { SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import HamburgerIconPath from '../../assets/images/hamburger.svg';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { useToggle } from '../../hooks/useToggle';
import Logo from '../Logo';
import ProfileDropdown from '../ProfileDropdown';
import Show from '../Show';
import Button from '../styled components/Button';
import { contentStyles } from '../styled components/Content';
import { Flex } from '../styled components/Flex';
import { Overlay } from '../styled components/Overlay';

/* TODO decide where each link goes*/
const links = [
	{ label: 'Home', route: routes.home },
	{ label: 'Tv Shows', route: routes.tvShows },
	{ label: 'Movies', route: routes.movies },
	{ label: 'New & Popular', route: routes.new },
	{ label: 'My List', route: routes.myList },
];

export default function Nav() {
	const { asPath } = useRouter();
	const [scrolled, setScrolled] = useState(false);
	const [expandedLinksPadding, setExpandedLinksPadding] = useState('0');
	const navContentRef = useRef<HTMLDivElement | any>(null);

	const {
		state: expanded,
		toggle: toggleExpanded,
		setState: setExpanded,
	} = useToggle();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		document.documentElement.style.overflow = expanded ? 'hidden' : 'unset';
	}, [expanded]);

	useEffect(() => {
		function calculatePadding() {
			if (!navContentRef.current) return;
			const contentWidth = navContentRef.current?.offsetWidth; // 93% of body from `contentStyles`
			const inlineMargin = (contentWidth / 93) * 3.5;
			setExpandedLinksPadding(`${inlineMargin + 5}px`);
		}
		calculatePadding();
		window.addEventListener('resize', calculatePadding);
		return () => window.removeEventListener('resize', calculatePadding);
	}, []);

	function handleClose() {
		setExpanded(false);
	}

	return (
		<Container scrolled={scrolled} expanded={expanded}>
			<Content ref={navContentRef}>
				<Show on={Breakpoints.tabletDown}>
					<StyledButton color='transparent' onClick={toggleExpanded}>
						<HamburgerIcon>
							<Image src={HamburgerIconPath} alt='' />
						</HamburgerIcon>
					</StyledButton>

					<ExpandedLinks expanded={expanded} paddingLeft={expandedLinksPadding}>
						<ExpandedLinksContent>
							<Link href={routes.account}>
								<BoldLink>Account</BoldLink>
							</Link>
							<Link href={routes.login}>
								<BoldLink>Sign Out</BoldLink>
							</Link>
						</ExpandedLinksContent>

						<Line />

						<ExpandedLinksContent>
							{links.map(({ route, label }) => (
								<Link key={route} href={route}>
									<BoldLink onClick={handleClose}>{label}</BoldLink>
								</Link>
							))}
						</ExpandedLinksContent>
					</ExpandedLinks>

					<StyledOverlay
						expanded={expanded}
						opacity={0.5}
						onClick={() => setExpanded(false)}
					/>
				</Show>

				<Logo />

				<Show on={Breakpoints.tabletUp}>
					<Links>
						{links.map(({ label, route }) => (
							<li key={route}>
								<Link href={route} passHref>
									<StyledLink active={asPath === route}>
										{label}
									</StyledLink>
								</Link>
							</li>
						))}
					</Links>
				</Show>

				<SearchContainer gap={2}>
					<StyledButton color='transparent'>
						<Icon as={SearchIcon} />
					</StyledButton>

					<Show on={Breakpoints.tabletUp}>
						<Link href={routes.account}>
							<ProfileDropdown />
						</Link>
					</Show>
				</SearchContainer>
			</Content>
		</Container>
	);
}

interface ContainerProps {
	scrolled: boolean;
}

const Container = styled.div<ContainerProps & ExpandedLinksProps>`
	--transition: 0.15s;

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	padding-block: var(--size-300);
	transition: var(--transition);

	${(p) =>
		p.scrolled &&
		css`
			background: var(--dark);
		`}
	${(p) =>
		p.expanded &&
		css`
			background: var(--black);
		`}
`;

const Content = styled.div`
	${contentStyles}
	display: grid;
	align-items: center;
	justify-items: left;
	gap: 1rem;
	grid-template-columns: auto auto 1fr;

	@media ${Breakpoints.tabletUp} {
		grid-template-columns: auto 1fr auto;
		gap: 3rem;
	}
`;

const Links = styled.ul`
	display: flex;
	list-style: none;
`;

interface StyledLinkProps {
	active: boolean;
}

const StyledLink = styled.a<StyledLinkProps>`
	padding: 1rem;
	color: var(--light);
	font-weight: 300;

	${(p) =>
		p.active &&
		css`
			font-weight: 500;
		`}

	:hover {
		color: var(--gray);
	}
`;

const StyledButton = styled(Button)`
	display: flex;
	padding: 0;
`;

const Icon = styled.div`
	height: var(--size-650);
	aspect-ratio: 1;
	position: relative;

	@media ${Breakpoints.tabletDown} {
		height: var(--size-700);
	}
`;

const HamburgerIcon = styled.div`
	aspect-ratio: 1;
	height: 4rem;
	display: flex;
`;

const SearchContainer = styled(Flex)`
	justify-self: right;
`;

interface ExpandedLinksProps {
	expanded: boolean;
	paddingLeft?: string;
}

const ExpandedLinks = styled.div<ExpandedLinksProps>`
	--padding-left: ${(p) => p.paddingLeft};
	position: fixed;
	top: 6.4rem;
	left: 0;
	background: var(--black);
	width: 280px;
	height: 100vh;
	transform: translateX(-100%);
	pointer-events: none;
	transition: var(--transition);
	z-index: -1;
	padding-block: 1rem;

	${(p) =>
		p.expanded &&
		css`
			transform: translateX(0);
			pointer-events: visible;
		`}
`;

const ExpandedLinksContent = styled.div`
	padding-left: var(--padding-left);
	display: grid;
`;

const Line = styled.div`
	height: 1px;
	width: 100%;
	background: var(--gray-transparent-200);
	margin-block: 1rem;
`;

const StyledOverlay = styled(Overlay)<ExpandedLinksProps>`
	z-index: -2;
	transition: var(--transition);
	opacity: 0;
	pointer-events: none;

	${(p) =>
		p.expanded &&
		css`
			opacity: unset;
			pointer-events: visible;
		`}
`;

const BoldLink = styled.a`
	font-weight: 500;
	letter-spacing: 0.02em;
	color: var(--gray);
	font-size: var(--size-500);
	padding-block: 0.5rem;
`;
