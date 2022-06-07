import Head from 'next/head';
import styled from 'styled-components';
import { baseAxios } from '../axios/config';
import CategoryList from '../components/home/CategoryList';
import Hero from '../components/home/Hero';
import Nav from '../components/Nav';
import { CategoryType, Props } from '../constants/types';

export default function Home(props: Props) {
	const {
		netflixOriginals,
		actionMovies,
		comedyMovies,
		documentaries,
		horrorMovies,
		romanceMovies,
		topRated,
		trending,
	} = props;

	const categories: CategoryType[] = [
		{ heading: 'Trending Now', movies: trending },
		{ heading: 'Top Rated', movies: topRated },
		{ heading: 'Action Thrillers', movies: actionMovies },
		{ heading: 'Comedy', movies: comedyMovies },
		{ heading: 'Horror', movies: horrorMovies },
		{ heading: 'Romance', movies: romanceMovies },
		{ heading: 'documentaries', movies: documentaries },
	];

	return (
		<Container>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Nav />
			<Hero netflixOriginals={netflixOriginals} />
			<CategoryList categories={categories} />
		</Container>
	);
}

const Container = styled.div`
	padding-bottom: 8rem;
`;

export async function getServerSideProps() {
	const requests = [
		`/trending/all/week`,
		`/movie/top_rated`,
		`/discover/movie?with_networks=213`,
		`/discover/movie?with_genres=28`,
		`/discover/movie?with_genres=35`,
		`/discover/movie?with_genres=27`,
		`/discover/movie?with_genres=10749`,
		`/discover/movie?with_genres=99`,
	];

	const requestPromises = requests.map((request) => baseAxios(request));
	const res = await Promise.all(requestPromises);
	const data = res.map((res) => res.data.results);

	const props: Props = {
		trending: data[0],
		topRated: data[1],
		netflixOriginals: data[2],
		actionMovies: data[3],
		comedyMovies: data[4],
		horrorMovies: data[5],
		romanceMovies: data[6],
		documentaries: data[7],
	};

	return {
		props,
	};
}
