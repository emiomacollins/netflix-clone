import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import { contentStyles } from '../../components/styled components/Content';
import { flexStyles } from '../../components/styled components/Flex';
import { Link } from '../../components/styled components/Link';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { firestore } from '../../firebase/firebase';
import PlansGrid from './components/PlansGrid';

interface Props {
	plans: Product[];
}

export default function Plans({ plans }: Props) {
	return (
		<Container>
			<Head>
				<title>Plans</title>
			</Head>

			<Header>
				<HeaderContent>
					<Logo />
					<NextLink href={routes.login}>
						<Link>Sign Out</Link>
					</NextLink>
				</HeaderContent>
			</Header>

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
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 3rem;
	padding-bottom: 4rem;
`;

const Header = styled.div`
	border-bottom: 1px solid var(--gray-transparent-200);
	padding-block: var(--size-400);
`;

const HeaderContent = styled.div`
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
