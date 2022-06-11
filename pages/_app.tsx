/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps as IndexProps } from 'next/app';
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
		const unsuscribe = auth.onAuthStateChanged((user) => {
			// TODO: fetch and append current subscription plan from firestore
			const plan = null;

			dispatch(setUser(user ? { email: user.email, plan } : null));

			!authInitialized && setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, []);

	return <Fragment>{authInitialized ? children : null}</Fragment>;
};
