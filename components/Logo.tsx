import Link from 'next/link';
import styled from 'styled-components';
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
	height: var(--size-650);
`;
