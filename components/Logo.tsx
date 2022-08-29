import Link from 'next/link';
import styled from 'styled-components';
import logoPath from '../assets/images/logo.svg';
import { Breakpoints } from '../constants/breakpoints';
import { routes } from '../constants/routes';

export default function Logo() {
	return (
		<Link href={routes.home} passHref>
			<a>
				<Image src={logoPath.src} alt='' />
			</a>
		</Link>
	);
}

const Image = styled.img`
	height: var(--size-600);

	@media ${Breakpoints.tabletUp} {
		height: var(--size-650);
	}
`;
