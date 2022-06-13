/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs } from 'firebase/firestore';
import type { AppProps as IndexProps } from 'next/app';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import ProtectRoutes from '../components/ProtectRoutes';
import WithSubscription from '../components/WithSubscription';
import { noSubscriptionRoutes, unProctectedRoutes } from '../constants/routes';
import { auth, firestore } from '../firebase/firebase';
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
		const unsuscribe = auth.onAuthStateChanged(async (user) => {
			// TODO: fetch and append current subscription plan from firestore
			const subscriptionsRef = collection(
				firestore,
				`customers/${user?.uid}/subscriptions`
			);
			const snapshot = await getDocs(subscriptionsRef);
			const subscriptions = snapshot.docs.map((doc) => doc.data());
			console.log(subscriptions);

			dispatch(setUser(user ? { email: user.email, subscriptions } : null));

			!authInitialized && setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, []);

	return <Fragment>{authInitialized ? children : null}</Fragment>;
};
