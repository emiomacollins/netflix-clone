import styled from 'styled-components';
import { Breakpoints } from '../../constants/breakpoints';
import { MovieCategory } from '../../constants/home/types';
import { useMyList } from '../../hooks/useMyList';
import { contentStyles } from '../styled components/Content';
import Category from './Category';

interface Props {
	categories: MovieCategory[];
}

export default function CategoryList({ categories }: Props) {
	const {
		query: { data: myList },
	} = useMyList();
	return (
		<Container>
			{categories.map((category) => (
				<Category key={category.title} {...category} />
			))}
			{myList?.length ? (
				<Category id='my-list' title='My List' movies={myList} />
			) : null}
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	display: grid;
	gap: 2rem;

	@media ${Breakpoints.tabletUp} {
		gap: 3rem;
	}
`;
