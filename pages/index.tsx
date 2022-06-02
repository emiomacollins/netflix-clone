import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import { baseAxios } from '../constants/api';
import { Props } from './types';

export default function Home(props: Props) {
	const { netflixOriginals } = props;

	return (
		<Container>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Nav />
			<Hero netflixOriginals={netflixOriginals} />
		</Container>
	);
}

const Container = styled.div`
	height: 500vh;
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
