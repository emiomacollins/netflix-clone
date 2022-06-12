import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import Button from '../../components/styled components/Button';
import { contentStyles } from '../../components/styled components/Content';
import { flexStyles } from '../../components/styled components/Flex';
import { Link } from '../../components/styled components/Link';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { logoPath } from '../../constants/urls/images';

interface Props {
	plans: Product;
}

export default function Plans({ plans }: Props) {
	console.log(plans);
	// const plans: Plan[] = useMemo(
	// 	() => [
	// 		{
	// 			title: 'basic',
	// 			price: 9.99,
	// 			resolution: '480p',
	// 			otherDevice: true,
	// 		},
	// 		{
	// 			title: 'standard',
	// 			price: 15.49,
	// 			resolution: '1080p',
	// 			otherDevice: true,
	// 		},
	// 		{
	// 			title: 'premium',
	// 			price: 19.99,
	// 			resolution: '4K+HDR',
	// 			otherDevice: true,
	// 		},
	// 	],
	// 	[]
	// );
	// const [selectedPlan, setSelectedPlan] = useState(plans[1]);

	return (
		<Container>
			<Head>
				<title>Plans</title>
			</Head>
			<Header>
				<HeaderContent>
					<NextLink href={routes.home}>
						<a>
							<Logo src={logoPath} alt='' />
						</a>
					</NextLink>
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

				<PlanDetails>
					{/* <Row>
						<Category />
						{plans.map((plan) => (
							<PlanBox
								key={plan.title}
								selected={selectedPlan === plan}
								onClick={() => setSelectedPlan(plan)}
							>
								{plan.title}
							</PlanBox>
						))}
					</Row>

					<Row>
						<Category>Monthly price</Category>
						{plans.map((plan) => (
							<Bold key={plan.price} selected={selectedPlan === plan}>
								${plan.price}
							</Bold>
						))}
					</Row>

					<Row>
						<Category>Resolution</Category>
						{plans.map((plan) => (
							<Bold key={plan.resolution} selected={selectedPlan === plan}>
								{plan.resolution}
							</Bold>
						))}
					</Row>

					<Row>
						<Category>
							Watch on your TV, computer, mobile phone and tablet
						</Category>
						{plans.map((plan) => (
							<Bold
								key={plan.title + plan.otherDevice}
								selected={selectedPlan === plan}
							>
								{plan.otherDevice && (
									<PlanCheckIcon
										color={`var(--${
											selectedPlan === plan ? 'red' : 'gray'
										})`}
									/>
								)}
							</Bold>
						))}
					</Row> */}
				</PlanDetails>

				<SubscribeBtn color='red'>Subscribe</SubscribeBtn>
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

const Logo = styled.img`
	height: var(--size-650);
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

const PlanDetails = styled.div`
	display: grid;
`;

const Row = styled.div`
	display: grid;
	gap: 1rem 2rem;
	text-align: center;
	padding: 1.5rem 1rem;
	grid-template-columns: repeat(3, 1fr);

	&:not(:first-child, :last-child) {
		border-bottom: 1px solid var(--gray-transparent);
	}

	@media ${Breakpoints.tabletUp} {
		gap: 5rem;
		grid-template-columns: 1fr repeat(3, 13rem);
	}
`;

interface PlanProps {
	selected?: boolean;
}

const PlanBox = styled.button<PlanProps>`
	color: inherit;
	border: 0;
	background: var(--red);
	aspect-ratio: 1;
	display: grid;
	place-content: center;
	text-transform: capitalize;
	border-radius: var(--radius-100);
	font-weight: 500;
	position: relative;
	opacity: ${(p) => (p.selected ? 1 : 0.7)};

	::before {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 40%) rotate(315deg);
		border: 0.35em solid var(--red);
		border-top-color: transparent;
		border-right-color: transparent;
	}
`;

const Category = styled.p`
	text-align: left;

	@media ${Breakpoints.tabletDown} {
		grid-column: 1/-1;
		text-align: center;
	}
`;

const Bold = styled.p<PlanProps>`
	font-weight: 500;
	color: var(--${(p) => (p.selected ? 'red' : 'gray')});
`;

const PlanCheckIcon = styled(CheckIcon)<PlanProps>`
	height: 3rem;
`;

const SubscribeBtn = styled(Button)`
	justify-self: center;
	padding: 0.8em 5em;
`;

export async function getServerSideProps() {
	// TODO: fetch plans

	return {
		props: {},
	};
}
