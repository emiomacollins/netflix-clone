import Head from 'next/head';
import NextLink from 'next/link';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import Button from '../../components/styled-components/Button';
import { contentStyles } from '../../components/styled-components/Content';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { Link } from '../../components/styled-components/Link';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { memberSinceIconPath } from '../../constants/urls/images';
import { getUser } from '../../lib/redux/slices/user/userSlice';
import redirectToManageSubscription from './api';

export default function Account() {
	const user = useSelector(getUser);

	const { createdAt, email, currentSubscription } = user || {};
	const { role, current_period_end, cancel_at: canceledAt } = currentSubscription || {};

	const nextBillingPeriod = new Date(current_period_end?.seconds * 1000).toDateString();
	const memberSince = new Intl.DateTimeFormat(navigator.language, {
		month: 'long',
		year: 'numeric',
	}).format(new Date(createdAt || ''));

	const { mutate: handleManageSubscription, isLoading } = useMutation(
		`redirectToManageSubscription-${user?.uid}`,
		redirectToManageSubscription
	);

	return (
		<Container>
			<Head>
				<title>Account</title>
			</Head>

			<Nav>
				<NavContent>
					<Logo />
				</NavContent>
			</Nav>

			<Content>
				<Header>
					<Heading>Account</Heading>
					<Flex gap={0.5}>
						<Icon src={memberSinceIconPath} alt='' />
						<MemberSinceText> Member since {memberSince}</MemberSinceText>
					</Flex>
				</Header>

				<Row>
					<MembershipAndBilling>
						<SettingTitle>MEMBERSHIP & BILLING</SettingTitle>
						<Button
							onClick={() => handleManageSubscription()}
							isLoading={isLoading}
							spinnerStyles={{
								borderColor: 'var(--black)',
								borderWidth: '1.8px',
							}}
						>
							Manage Subscription
						</Button>
					</MembershipAndBilling>
					<Grid gap={0}>
						<InnerRow>
							<Grid gap={0.5}>
								<Bold>{email}</Bold>
								<p>Password: *******</p>
							</Grid>
							<NextLink href={routes.changePassword}>
								<StyledLink>Change password</StyledLink>
							</NextLink>
						</InnerRow>
						<InnerRow>
							<p>
								{canceledAt
									? 'Your membership will end on'
									: 'Your next billing date is'}{' '}
								{nextBillingPeriod}
							</p>
						</InnerRow>
					</Grid>
				</Row>

				<Row>
					<SettingTitle>PLAN DETAILS</SettingTitle>
					<Grid>
						<InnerRow>
							{role && <SubscriptionType>{role}</SubscriptionType>}
						</InnerRow>
					</Grid>
				</Row>

				<Row>
					<SettingTitle>SETTINGS</SettingTitle>
					<Grid>
						<InnerRow>
							<NextLink href={routes.login}>
								<StyledLink>Sign out</StyledLink>
							</NextLink>
						</InnerRow>
					</Grid>
				</Row>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 2rem;
	color: var(--gray);
	letter-spacing: 0.02em;

	@media ${Breakpoints.tabletUp} {
		gap: 4rem;
	}
`;

const Nav = styled.div`
	border-bottom: 1px solid var(--gray-transparent-200);
	padding-block: var(--size-400);
`;

const NavContent = styled.div`
	${flexStyles}
	${contentStyles}
    justify-content: space-between;
`;

const Content = styled.div`
	${contentStyles}
	max-width: 1100px;
`;

const Header = styled.div`
	${flexStyles}
	padding-block: 2rem;
`;

const Row = styled.div`
	display: grid;
	gap: 1rem 3rem;
	padding-block: 1.5rem;
	border-top: 1px solid var(--gray-transparent);
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-template-columns: 1.1fr 2.5fr;
		padding-block: 2rem;
	}
`;

const Heading = styled.h2`
	font-size: clamp(2.5rem, 2.4vw, 4.5rem);
	font-weight: 400;
	color: var(--light);
`;

const Bold = styled.span`
	font-weight: 500;
`;

const MemberSinceText = styled(Bold)`
	font-size: var(--size-350);
`;

const Icon = styled.img`
	height: var(--size-600);
`;

const SettingTitle = styled.p`
	font-size: var(--size-400);
`;

const InnerRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-block: 1rem;
	flex-wrap: wrap;
	gap: 1rem 3rem;

	&:first-child {
		padding-top: 0;
	}

	&:only-child {
		padding: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--gray-transparent-200);
	}
`;

const StyledLink = styled(Link)`
	color: var(--blue);
	font-weight: 400;
	letter-spacing: 0;
`;

const MembershipAndBilling = styled.div`
	display: grid;
	gap: 1rem;
	justify-self: left;
`;

const SubscriptionType = styled(Bold)`
	text-transform: capitalize;
	border: 1.5px solid var(--gray);
	padding: 0.1em 0.7em 0.2em;
	font-size: var(--size-350);
	border-radius: var(--radius-400);
	user-select: none;
`;
