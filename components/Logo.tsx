import Link from 'next/link';
import styled from 'styled-components';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';
import { logoPath } from '../constants/urls/images';

export default function Logo() {
	return (
		<Link href={routes.home} passHref>
			<a>
				<Container src={logoPath} alt='' />
			</a>
		</Link>
	);
}

const Container = styled.img`
	height: var(--size-600);

	@media ${Breakpoints.tabletUp} {
		height: var(--size-650);
	}
`;
