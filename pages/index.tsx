import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import CategoryList from '../components/home/CategoryList';
import Hero from '../components/home/Hero';
import Modal from '../components/modal/Modal';
import Nav from '../components/nav/Nav';
import { flexStyles } from '../components/styled components/Flex';
import { Link } from '../components/styled components/Link';
import { Breakpoints } from '../constants/breakpoints';
import { Movie, MovieCategory } from '../constants/home/types';
import { baseAxios } from '../lib/axios/config';

interface Props {
	categories: MovieCategory[];
	randomMovie: Movie;
}

export default function Home({ categories, randomMovie }: Props) {
	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			<Nav />
			<Modal />
			<Hero randomMovie={randomMovie} />
			<CategoryList categories={categories} />
			<Footer>
				<StyledLink
					href='https://github.com/emiomacollins'
					target='_blank'
					rel='noopener noreferrer'
				>
					©2022 Developed by @emiomacollins
				</StyledLink>
			</Footer>
		</Container>
	);
}

const Container = styled.div``;

const Footer = styled.div`
	display: flex;
	justify-content: center;
	padding-block: 6rem 2rem;
	gap: 1rem;

	@media ${Breakpoints.tabletUp} {
		padding-block: 8rem 2rem;
	}
`;

const StyledLink = styled(Link)`
	${flexStyles}
	font-size: var(--size-300);
	font-weight: 300;
	text-decoration: underline;

	&:hover {
		opacity: 0.8;
	}
`;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
	const { category } = query;

	let routes = [
		{
			title: 'Netflix Originals',
			url: `/discover/movie?with_networks=213`,
		},
		{ title: 'Trending Now', url: `/trending/all/week` },
		{ title: 'Tv Shows', url: `discover/tv` },
		{ title: 'Action Thrillers', url: `/discover/movie?with_genres=28` },
		{ title: 'Comedy', url: `/discover/movie?with_genres=35` },
		{ title: 'Horror', url: `/discover/movie?with_genres=27` },
		{ title: 'Romance', url: `/discover/movie?with_genres=10749` },
		{ title: 'Documentaries', url: `/discover/movie?with_genres=99` },
	];

	if (category === 'movie')
		routes = [
			{
				title: 'Netflix Originals',
				url: `/discover/movie?with_networks=213`,
			},
			{ title: 'Trending Now', url: `/trending/movie/week` },
			{ title: 'Top Rated', url: `/movie/top_rated` },
			{ title: 'Action Thrillers', url: `/discover/movie?with_genres=28` },
			{ title: 'Comedy', url: `/discover/movie?with_genres=35` },
			{ title: 'Horror', url: `/discover/movie?with_genres=27` },
			{ title: 'Romance', url: `/discover/movie?with_genres=10749` },
			{ title: 'Documentaries', url: `/discover/movie?with_genres=99` },
		];

	if (category === 'tv')
		routes = [
			{
				title: 'Netflix Originals',
				url: `/discover/tv?with_networks=213`,
			},
			{ title: 'Trending Now', url: `/trending/tv/week` },
			{ title: 'Top Rated', url: `/tv/top_rated` },
			{ title: 'Comedy', url: `/discover/tv?with_genres=35` },
			{ title: 'Talk shows', url: `/discover/tv?with_type=5` },
			{ title: 'Romance', url: `/discover/tv?with_genres=10749` },
			{ title: 'Documentaries', url: `/discover/tv?with_genres=99` },
		];

	interface Result {
		data: { results: Movie[] };
	}

	const results: Result[] = await Promise.all(
		routes.map(({ url }) => baseAxios(url || ''))
	);

	const data: MovieCategory[] = results.map(({ data: { results } }, i) => {
		return { ...routes[i], movies: results };
	});

	const [netflixOriginals, ...categories] = data;
	const randomIndex = Math.floor(Math.random() * netflixOriginals.movies?.length);
	const randomMovie = netflixOriginals.movies[randomIndex];
	return {
		props: {
			categories,
			randomMovie,
		},
	};
}
