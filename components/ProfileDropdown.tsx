import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import ProfileIconPath from '../assets/images/profileIcon.jpg';
import { routes } from '../constants/routes';

export default function ProfileDropdown() {
	return (
		<Link href={routes.account}>
			<ProfileIcon>
				<Image src={ProfileIconPath} alt='' />
			</ProfileIcon>
		</Link>
	);
}

const ProfileIcon = styled.div`
	width: var(--size-650);
	cursor: pointer;
	display: flex;

	img {
		border-radius: var(--radius-300);
	}
`;
