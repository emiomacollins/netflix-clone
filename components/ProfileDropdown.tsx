import Image from 'next/image';
import styled from 'styled-components';
import { routes } from '../constants/routes';
import Dropdown from './Dropdown';
import ProfileIconPath from '../assets/images/profileIcon.jpg';

export default function ProfileDropdown() {
	return (
		<Dropdown
			label={
				<ProfileIcon>
					<Image src={ProfileIconPath} alt='' />
				</ProfileIcon>
			}
			options={[
				{ label: 'Account', route: routes.account },
				{ label: 'Sign out', route: routes.login },
			]}
			top='150%'
			right='0'
		/>
	);
}

const ProfileIcon = styled.div`
	cursor: pointer;
	width: var(--size-650);
	display: flex;

	img {
		border-radius: var(--radius-300);
	}
`;
