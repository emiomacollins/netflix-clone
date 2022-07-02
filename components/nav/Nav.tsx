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
import SearchBar from '../SearchBar';
import Show from '../Show';
import Button from '../styled-components/Button';
import { contentStyles, contentWidthPercent } from '../styled-components/Content';
import { Grid } from '../styled-components/Grid';
import { Overlay } from '../styled-components/Overlay';

const links = [
	{ label: 'Home', route: routes.home },
	{ label: 'Tv Shows', route: routes.tvShows },
	{ label: 'Movies', route: routes.movies },
	// { label: 'New & Popular', route: routes.new },
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
		const handleSetScrolled = () => setScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleSetScrolled);
		return () => window.removeEventListener('scroll', handleSetScrolled);
	}, []);

	useEffect(() => {
		const calculatePadding = () => {
			if (!navContentRef.current) return;
			const contentWidthPixels = navContentRef.current?.offsetWidth;
			const inlineMarginPercent = (100 - contentWidthPercent) / 2;
			const hambugerIconWhitespacePixels = 5;
			const inlineMarginPixels =
				(contentWidthPixels / contentWidthPercent) * inlineMarginPercent;
			setExpandedLinksPadding(
				`${inlineMarginPixels + hambugerIconWhitespacePixels}px`
			);
		};
		calculatePadding();
		window.addEventListener('resize', calculatePadding);
		return () => window.removeEventListener('resize', calculatePadding);
	}, []);

	useEffect(() => {
		document.documentElement.style.overflow = expanded ? 'hidden' : 'unset';
	}, [expanded]);

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
						<Grid gap={0}>
							<Link href={routes.account} onClick={handleClose}>
								<BoldLink>Account</BoldLink>
							</Link>
							<Link href={routes.login} onClick={handleClose}>
								<BoldLink>Sign Out</BoldLink>
							</Link>
						</Grid>

						<Line />

						<Grid gap={0}>
							{links.map(({ route, label }) => (
								<Link key={route} href={route}>
									<BoldLink
										active={asPath === route}
										onClick={handleClose}
									>
										{label}
									</BoldLink>
								</Link>
							))}
						</Grid>
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

				<SearchContainer gap={0}>
					<SearchBar />
					<Show on={Breakpoints.tabletUp}>
						<ProfileDropdown />
					</Show>
				</SearchContainer>
			</Content>
		</Container>
	);
}

interface ContainerProps {
	scrolled: boolean;
}

const Container = styled.div<ContainerProps & ExpandedProps>`
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
		gap: 3rem;
	}
`;

const Links = styled.ul`
	display: flex;
	list-style: none;
`;

interface StyledLinkProps {
	active?: boolean;
}

const StyledLink = styled.a<StyledLinkProps>`
	padding: 1rem;
	color: var(--light);
	font-weight: 300;
	white-space: nowrap;

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
	padding: 0;
`;

const HamburgerIcon = styled.div`
	aspect-ratio: 1;
	height: 4rem;
	display: flex;
`;

const SearchContainer = styled(Grid)`
	grid-template-columns: 1fr auto;
	justify-self: right;
	gap: 1rem;
	align-items: center;
`;

interface ExpandedProps {
	expanded: boolean;
	paddingLeft?: string;
}

const ExpandedLinks = styled.div<ExpandedProps>`
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

const Line = styled.div`
	height: 1px;
	width: 100%;
	background: var(--gray-transparent-200);
	margin-block: 1rem;
`;

const StyledOverlay = styled(Overlay)<ExpandedProps>`
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

const BoldLink = styled.a<StyledLinkProps>`
	font-weight: 500;
	letter-spacing: 0.02em;
	color: var(--gray);
	font-size: var(--size-500);
	padding-block: 1rem;
	padding-left: var(--padding-left);
	border-left: 0.2em solid transparent;

	${(p) =>
		p.active &&
		css`
			border-color: var(--red);
			color: var(--light);
		`}
`;
