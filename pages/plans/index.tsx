import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { Link } from '../../components/styled-components/Link';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { firestore } from '../../lib/firebase/firebase';
import { getUser } from '../../lib/redux/slices/user/userSlice';
import PlansGrid from './components/PlansGrid';

interface Props {
	plans: Product[];
}

export default function Plans({ plans }: Props) {
	const router = useRouter();
	const user = useSelector(getUser);
	const cardInfoRef = useRef<HTMLDivElement>();

	useEffect(() => {
		cardInfoRef.current?.scrollIntoView();
	}, []);

	if (user?.currentSubscription) {
		router.push(routes.home);
		return null;
	}

	return (
		<Container>
			<Head>
				<title>Plans</title>
			</Head>

			<Nav>
				<NavContent>
					<Logo />
					<NextLink href={routes.login}>
						<Link>Sign Out</Link>
					</NextLink>
				</NavContent>
			</Nav>

			<Content>
				<Heading>Choose the plan that&apos;s right for you</Heading>
				<BulletPoints>
					<BulletPoint>
						<BulletPointCheckIcon /> Watch all you want. Ad-free.
					</BulletPoint>
					<BulletPoint>
						<BulletPointCheckIcon /> Recommendations just for you.
					</BulletPoint>
					<BulletPoint>
						<BulletPointCheckIcon /> Change or cancel your plan anytime.
					</BulletPoint>
				</BulletPoints>

				<PlansGrid plans={plans} />
			</Content>

			<TestCardInfo ref={cardInfoRef as any}>
				<TestCardInfoContent>
					<TestCardInfoHeading>
						USE THE FOLLOWING TEST CARD DETAILS TO CHECKOUT
					</TestCardInfoHeading>
					<Columns>
						<span>Card number: 4242 4242 4242 4242</span>{' '}
						<span>CVC: any 3 digit number</span>
						<span>MM/YY : any future date</span>
					</Columns>
				</TestCardInfoContent>
			</TestCardInfo>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 3rem;
	padding-bottom: 25rem;
	min-height: 100vh;
	align-content: flex-start;
	position: relative;
`;

const Nav = styled.div`
	border-bottom: 1px solid var(--gray-transparent-200);
	padding-block: var(--size-400);
`;

const NavContent = styled.div`
	${contentStyles}
	${flexStyles}
	justify-content: space-between;
`;

const Content = styled.div`
	${contentStyles}
	max-width: 900px;
	display: grid;
	gap: 1rem;

	@media ${Breakpoints.tabletUp} {
		gap: 2rem;
	}
`;

const Heading = styled.h2`
	font-size: var(--size-650);
`;

const BulletPoints = styled.ul`
	list-style: none;
`;

const BulletPoint = styled.li`
	${flexStyles}
`;

const BulletPointCheckIcon = styled(CheckIcon).attrs(() => ({ color: `var(--red)` }))`
	height: 3rem;
	margin-top: 0.2rem;
`;

const TestCardInfo = styled.div`
	padding-block: 1.8em;
	background: var(--red);
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	color: var(--light);
	letter-spacing: 0.01em;
`;

const TestCardInfoHeading = styled.h3`
	font-size: var(--size-400);
	line-height: 1.5;
`;

const Columns = styled.div`
	display: grid;
	gap: 1rem;

	@media ${Breakpoints.tabletUp} {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
`;

const TestCardInfoContent = styled.div`
	${contentStyles}
	max-width: 900px;
	display: grid;
	gap: 1rem;
`;

export async function getServerSideProps() {
	const ref = collection(firestore, 'products');
	const snapshot = await getDocs(ref);
	const plans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	return {
		props: {
			plans,
		},
	};
}
