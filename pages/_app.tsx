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
import { fetchSubscription } from '../hooks/useSubscription/api';
import { auth } from '../lib/firebase/firebase';
import { setUser } from '../lib/redux/slices/user/userSlice';
import store from '../lib/redux/store';
import '../styles/globals.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// this is your index.ts (providers go here)
export default function MyApp({ Component, pageProps }: IndexProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App>
					<Component {...pageProps} />
				</App>
			</QueryClientProvider>
		</Provider>
	);
}

interface AppProps {
	children?: ReactNode;
}

// this is your App.ts
// global react logic goes here
// it exist's because global logic needs to use providers data/logic i.e redux dispatch
const App = ({ children }: AppProps) => {
	const dispatch = useDispatch();
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) dispatch(setUser(null));
			else {
				const currentSubscription = await fetchSubscription(user.uid);
				dispatch(
					setUser({
						uid: user.uid,
						email: user.email,
						currentSubscription,
						createdAt: user.metadata.creationTime || '',
					})
				);
			}
			!authInitialized && setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, []);

	return (
		<Fragment>
			{authInitialized ? (
				<ProtectRoutes exclude={unProctectedRoutes}>
					<WithSubscription exclude={noSubscriptionRoutes}>
						<ProgressBar />
						<Head>
							<link rel='icon' href='/logo.ico' />
							<title>Netflix</title>
						</Head>
						{children}
					</WithSubscription>
				</ProtectRoutes>
			) : null}
		</Fragment>
	);
};
