import Head from 'next/head';
import styled from 'styled-components';
import CategoryList from '../components/home/CategoryList';
import Hero from '../components/home/Hero';
import Modal from '../components/modal/Modal';
import Nav from '../components/nav/Nav';
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
			{/* TODO: Footer (check netflix own) */}
		</Container>
	);
}

const Container = styled.div`
	padding-bottom: 8rem;
`;

export async function getServerSideProps() {
	const routes = [
		{
			title: 'Netflix Originals',
			url: `/discover/movie?with_networks=213`,
		},
		{ title: 'Trending Now', url: `/trending/all/week` },
		{ title: 'Top Rated', url: `/movie/top_rated` },
		{ title: 'Action Thrillers', url: `/discover/movie?with_genres=28` },
		{ title: 'Comedy', url: `/discover/movie?with_genres=35` },
		{ title: 'Horror', url: `/discover/movie?with_genres=27` },
		{ title: 'Romance', url: `/discover/movie?with_genres=10749` },
		{ title: 'Documentaries', url: `/discover/movie?with_genres=99` },
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
