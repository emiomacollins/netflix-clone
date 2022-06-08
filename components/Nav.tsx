import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';
import Show from './Show';
import Button from './styled components/Button';
import { contentStyles } from './styled components/Content';

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

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Container scrolled={scrolled}>
			<Content>
				<Link href={routes.home}>
					<a>
						<Logo alt='' src='https://rb.gy/ulxxee' />
					</a>
				</Link>

				<Show on={Breakpoints.tabletUp}>
					<Links>
						{links.map(({ label, route }) => (
							<li key={route}>
								<Link href={route}>
									<StyledLink active={asPath === route}>
										{label}
									</StyledLink>
								</Link>
							</li>
						))}
					</Links>
				</Show>

				<Show on={Breakpoints.tabletDown}>
					<Button color='transparent'>Browse</Button>
				</Show>

				<Icons>
					<Search color='transparent'>
						<StyledSearchIcon />
					</Search>
					<Link href={routes.account}>
						<ProfileIcon src='https://rb.gy/g1pwyx' alt='' />
					</Link>
				</Icons>
			</Content>
		</Container>
	);
}

interface ContainerProps {
	scrolled: boolean;
}

const Container = styled.div<ContainerProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	transition: 0.2s;
	z-index: 99;
	padding-block: var(--size-400);

	${(p) =>
		p.scrolled &&
		css`
			background: var(--dark);
		`}
`;

const Content = styled.div`
	${contentStyles}
	display: grid;
	align-items: center;
	justify-items: left;
	gap: 2rem;
	grid-template-columns: auto 1fr auto;

	@media ${Breakpoints.tabletUp} {
		gap: 3rem;
	}
`;

const Logo = styled.img`
	width: clamp(10rem, 8vw, 20rem);
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

const Icons = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
`;

const Search = styled(Button)`
	display: flex;
	padding: 0;
`;

const StyledSearchIcon = styled(SearchIcon)`
	width: var(--size-600);
`;

const ProfileIcon = styled.img`
	border-radius: var(--radius-300);
	width: var(--size-650);
	cursor: pointer;
`;
