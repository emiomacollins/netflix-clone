import Head from 'next/head';
import styled from 'styled-components';
import { baseAxios } from '../axios/config';
import CategoryList from '../components/home/CategoryList';
import Hero from '../components/home/Hero';
import Modal from '../components/modal/Modal';
import Nav from '../components/Nav';
import { homePageData } from '../constants/types';

interface Props {
	data: homePageData[];
}

export default function Home({ data }: Props) {
	const [netflixOriginals, ...categories] = data;

	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			<Nav />
			<Modal />
			<Hero netflixOriginals={netflixOriginals.movies} />
			<CategoryList categories={categories} />
		</Container>
	);
}

const Container = styled.div`
	padding-bottom: 8rem;
`;

export async function getServerSideProps() {
	const data: homePageData[] = [
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
		{ title: 'documentaries', url: `/discover/movie?with_genres=99` },
	];

	const results = await Promise.all(data.map(({ url }) => baseAxios(url)));
	results.forEach(({ data: { results } }, index) => {
		data[index].movies = results;
	});

	return {
		props: {
			data,
		},
	};
}
