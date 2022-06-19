import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import LoadQuery from '../../components/LoadQuery';
import Modal from '../../components/modal/Modal';
import MovieThumbnail from '../../components/MovieThumbnail';
import Nav from '../../components/nav/Nav';
import { Content } from '../../components/styled components/Content';
import { Grid } from '../../components/styled components/Grid';
import { Movie } from '../../constants/home/types';
import searchMovie from './api';

export default function Search() {
	const {
		query: { searchQuery },
	} = useRouter();

	const query = useQuery(['searchMovie', searchQuery], () => searchMovie(searchQuery), {
		enabled: searchQuery ? true : false,
	});

	return (
		<Container>
			<Nav />
			<Modal />
			<Content>
				<LoadQuery query={query}>
					{(movies: Movie[] | undefined) => {
						if (!searchQuery) return <h2>Search for a movie</h2>;
						if (!movies?.length)
							return <h2>Found 0 results for &apos;{searchQuery}&apos;</h2>;
						return (
							<Grid gap={2}>
								<h2>Search results for &apos;{searchQuery}&apos;</h2>
								<Movies>
									{movies.map((movie, i) => (
										<StyledThumbnail
											key={movie.id + i}
											movie={movie}
										/>
									))}
								</Movies>
							</Grid>
						);
					}}
				</LoadQuery>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	padding-block: 10rem 5rem;
`;

const Movies = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 4rem 1rem;
`;

const StyledThumbnail = styled(MovieThumbnail)`
	&:hover {
		z-index: 1;
	}
`;
