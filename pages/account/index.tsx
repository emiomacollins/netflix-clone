import Head from 'next/head';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import ProfileDropdown from '../../components/ProfileDropdown';
import { contentStyles } from '../../components/styled components/Content';
import { flexStyles } from '../../components/styled components/Flex';

export default function Account() {
	return (
		<Container>
			<Head>
				<title>Account</title>
			</Head>
			<Header>
				<HeaderContent>
					<Logo />
					<ProfileDropdown />
				</HeaderContent>
			</Header>
		</Container>
	);
}

const Container = styled.div``;

const Header = styled.div`
	border-bottom: 1px solid var(--gray-transparent-200);
	padding-block: var(--size-400);
`;

const HeaderContent = styled.div`
	${flexStyles}
	${contentStyles}
    justify-content: space-between;
`;

const Row = styled.div``;
