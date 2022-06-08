import type { AppProps } from 'next/app';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase/firebase';
import { getUser, setUser } from '../redux/slices/user/user';
import store from '../redux/store';
import '../styles/globals.css';

// this is your index.js (providers go here)
export default function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {},
		},
	});

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
			</QueryClientProvider>
		</Provider>
	);
}

interface WrapperProps {
	children?: ReactNode;
}

// this is your App.js (global react logic goes here)
const Wrapper = ({ children }: WrapperProps) => {
	const dispatch = useDispatch();
	const [authInitialized, setAuthInitialized] = useState(false);
	const user = useSelector(getUser);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			dispatch(setUser(user ? { email: user.email } : null));
			setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, [dispatch]);

	return <Fragment>{authInitialized ? children : null}</Fragment>;
};
