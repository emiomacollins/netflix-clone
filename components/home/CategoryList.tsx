import styled from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { CategoryType } from '../../constants/types';
import { contentStyles } from '../styled components/Content';
import Category from './Category';

interface Props {
	categories: CategoryType[];
}

export default function CategoryList({ categories }: Props) {
	return (
		<Container>
			{categories.map((category) => (
				<Category key={category.heading} {...category} />
			))}
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	display: grid;
	gap: 2rem;

	@media ${Breakpoints.tabletUp} {
		gap: 4rem;
	}
`;
