/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps as IndexProps } from 'next/app';
import Head from 'next/head';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import ProtectRoutes from '../components/ProtectRoutes';
import WithSubscription from '../components/WithSubscription';
import { noSubscriptionRoutes, unProctectedRoutes } from '../constants/routes';
import { auth } from '../firebase/firebase';
import { setUser } from '../redux/slices/user/userSlice';
import store from '../redux/store';
import '../styles/globals.css';

// this is your index.js (providers go here)
export default function MyApp({ Component, pageProps }: IndexProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App>
					<ProtectRoutes exclude={unProctectedRoutes}>
						<WithSubscription exclude={noSubscriptionRoutes}>
							<ProgressBar />
							<Head>
								<link rel='icon' href='/logo.ico' />
							</Head>
							<Component {...pageProps} />
						</WithSubscription>
					</ProtectRoutes>
				</App>
			</QueryClientProvider>
		</Provider>
	);
}

interface AppProps {
	children?: ReactNode;
}

// this is your App.ts (global react logic goes here)
const App = ({ children }: AppProps) => {
	const dispatch = useDispatch();
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) dispatch(setUser(null));
			else {
				await user.getIdToken(true);
				const decodedToken = await user.getIdTokenResult();
				const isSubscribed = decodedToken?.claims?.stripeRole ? true : false;
				dispatch(setUser({ uid: user.uid, email: user.email, isSubscribed }));
			}
			!authInitialized && setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, []);

	return <Fragment>{authInitialized ? children : null}</Fragment>;
};
