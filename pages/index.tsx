import Head from 'next/head';
import styled from 'styled-components';
import { baseAxios } from '../axios/config';
import CategoryList from '../components/home/CategoryList';
import Hero from '../components/home/Hero';
import Modal from '../components/modal/Modal';
import Nav from '../components/Nav';
import { homePageDataType, homePageProps } from '../constants/types';

export default function Home({ homePageData }: homePageProps) {
	const [netflixOriginals, ...categories] = homePageData;

	return (
		<Container>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
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
	const homePageData: homePageDataType[] = [
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

	const results = await Promise.all(homePageData.map(({ url }) => baseAxios(url)));
	results.forEach(({ data: { results } }, i) => (homePageData[i].movies = results));

	return {
		props: {
			homePageData,
		},
	};
}
