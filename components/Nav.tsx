import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';
import Show from './Show';

const links = [
	{ label: 'Home', route: routes.home },
	{ label: 'Tv Shows', route: routes.tvShows },
	{ label: 'Movies', route: routes.movies },
	{ label: 'New & Popular', route: routes.new },
	{ label: 'My List', route: routes.myList },
];

function Nav() {
	return (
		<Container>
			<Logo alt='' src='https://rb.gy/ulxxee' />

			<Show on={Breakpoints.tabletUp}>
				<Links>
					{links.map(({ label, route }) => (
						<li key={route}>
							<Link href={route}>
								<StyledLink>{label}</StyledLink>
							</Link>
						</li>
					))}
				</Links>
			</Show>

			<Show on={Breakpoints.tabletDown}>
				<button>Browse</button>
			</Show>

			<Icons>
				<Search>
					<SearchIcon width={30} />
				</Search>
			</Icons>
		</Container>
	);
}

export default Nav;

const Container = styled.div`
	display: grid;
	align-items: center;
	justify-items: left;
	gap: 2rem;
	grid-template-columns: auto 1fr auto;
	padding: 2rem;

	@media ${Breakpoints.tabletUp} {
		gap: 4rem;
	}
`;

const Logo = styled.img`
	width: 100px;
`;

const Links = styled.ul`
	display: flex;
	list-style: none;
`;

const StyledLink = styled.a`
	cursor: pointer;
	padding: 1rem;
	:hover {
		color: var(--gray);
	}
`;

const Icons = styled.div``;

const Search = styled.button``;
