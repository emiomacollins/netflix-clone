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
				<link rel='icon' href='/logo.ico' />
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
	opacity: 0.7;

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
			media_type: 'movie',
		},
		{ title: 'Trending Now', url: `/trending/movie/week`, media_type: 'movie' },
		{ title: 'Tv Shows', url: `discover/tv`, media_type: 'tv' },
		{
			title: 'Action Thrillers',
			url: `/discover/movie?with_genres=28`,
			media_type: 'movie',
		},
		{ title: 'Comedy', url: `/discover/movie?with_genres=35&`, media_type: 'movie' },
		{ title: 'Horror', url: `/discover/movie?with_genres=27`, media_type: 'movie' },
		{
			title: 'Romance',
			url: `/discover/movie?with_genres=10749`,
			media_type: 'movie',
		},
		{
			title: 'Documentaries',
			url: `/discover/movie?with_genres=99`,
			media_type: 'movie',
		},
	];

	if (category === 'movie')
		routes = [
			{
				title: 'Netflix Originals',
				url: `/discover/movie?with_networks=213`,
			},
			{ title: 'Trending Now', url: `/trending/movie/week` },
			{ title: 'Top Rated', url: `/movie/top_rated` },
			{
				title: 'Action Thrillers',
				url: `/discover/movie?with_genres=28`,
			},
			{
				title: 'Comedy',
				url: `/discover/movie?with_genres=35`,
			},
			{
				title: 'Horror',
				url: `/discover/movie?with_genres=27`,
			},
			{
				title: 'Romance',
				url: `/discover/movie?with_genres=10749`,
			},
			{
				title: 'Documentaries',
				url: `/discover/movie?with_genres=99`,
			},
		].map((route) => ({ ...route, media_type: 'movie' }));

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
			{
				title: 'Romance',
				url: `/discover/tv?with_genres=10749`,
			},
			{
				title: 'Documentaries',
				url: `/discover/tv?with_genres=99`,
			},
		].map((route) => ({ ...route, media_type: 'tv' }));

	interface PromiseResult {
		data: { results: Movie[] };
	}

	const PromiseResults: PromiseResult[] = await Promise.all(
		routes.map(({ url }) => baseAxios(url || ''))
	);

	const data: MovieCategory[] = PromiseResults.map((promiseResult, i) => {
		const {
			data: { results },
		} = promiseResult;
		const correspondingRoute = routes[i];
		return {
			...correspondingRoute,
			movies: results.map((movie) => {
				const { media_type } = movie;
				// assign media_type manually for modal fetching
				return { ...movie, media_type: media_type || routes[i].media_type };
			}),
		};
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
