import styled from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { homePageData } from '../../constants/home/types';
import { contentStyles } from '../styled components/Content';
import Category from './Category';

interface Props {
	categories: homePageData[];
}

export default function CategoryList({ categories }: Props) {
	return (
		<Container>
			{categories.map((category) => (
				<Category key={category.title} {...category} />
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
