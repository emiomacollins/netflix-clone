import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../components/Nav';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main></main>
		</div>
	);
};

export default Home;
