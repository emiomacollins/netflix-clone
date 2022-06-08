import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { auth } from '../firebase/firebase';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {},
		},
	});

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log(user);
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
