import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Nav from '../components/Nav';

const Home: NextPage = () => {
	return (
		<Container>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Nav />

			<Hero />
		</Container>
	);
};

export default Home;

const Container = styled.div``;
