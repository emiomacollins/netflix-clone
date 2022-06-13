import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/styled components/Button';
import { Breakpoints } from '../../../constants/breakpoints';
import { checkout } from '../api';

interface Props {
	plans: Product[];
}

export default function PlansGrid({ plans }: Props) {
	const [selectedPlan, setSelectedPlan] = useState(plans[1]);
	const [isLoading, setIsLoading] = useState(false);

	async function handleCheckout() {
		await checkout({ selectedPlan, setIsLoading });
	}

	return (
		<Container>
			<Grid>
				<Row>
					<Category />

					{plans.map((plan) => (
						<PlanBox
							key={plan.name}
							selected={selectedPlan === plan}
							onClick={() => setSelectedPlan(plan)}
						>
							{plan.name}
						</PlanBox>
					))}
				</Row>

				<Row>
					<Category>Monthly price</Category>
					{plans.map((plan) => (
						<Bold key={plan.metadata.price} selected={selectedPlan === plan}>
							{plan.metadata.price}
						</Bold>
					))}
				</Row>

				<Row>
					<Category>Resolution</Category>
					{plans.map((plan) => (
						<Bold
							key={plan.metadata.resolution}
							selected={selectedPlan === plan}
						>
							{plan.metadata.resolution}
						</Bold>
					))}
				</Row>

				<Row>
					<Category>
						Watch on your TV, computer, mobile phone and tablet
					</Category>
					{plans.map((plan) => (
						<Bold
							key={plan.name + plan.metadata.otherDevice}
							selected={selectedPlan === plan}
						>
							{plan.metadata.otherDevice === 'true' && (
								<PlanCheckIcon
									color={`var(--${
										selectedPlan === plan ? 'red' : 'gray'
									})`}
								/>
							)}
						</Bold>
					))}
				</Row>
			</Grid>
			<SubscribeBtn color='red' isLoading={isLoading} onClick={handleCheckout}>
				Subscribe
			</SubscribeBtn>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 2rem;
`;

const Grid = styled.div`
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
	padding: 0.8em 5em;
	margin-inline: auto;
	width: 100%;
	max-width: 240px;
	display: flex;
	justify-content: center;
`;
