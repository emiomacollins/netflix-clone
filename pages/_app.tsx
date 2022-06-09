/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import { routes } from '../constants/routes';
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
					<ProtectRoutes exclude={[routes.login, routes.signUp]}>
						<ProgressBar />
						<Component {...pageProps} />
					</ProtectRoutes>
				</Wrapper>
			</QueryClientProvider>
		</Provider>
	);
}

interface ProtectRoutesProps {
	exclude?: string[];
	children: ReactNode;
}

const ProtectRoutes = ({ exclude, children }: ProtectRoutesProps) => {
	// auth will be initialized before this component renders
	const router = useRouter();
	const { pathname } = router;
	const user = useSelector(getUser);

	// if url is not protected return Component
	if (exclude?.includes(pathname)) return <Fragment>{children}</Fragment>;
	// if url is protected & user is not logged in redirect
	if (!user) router.push(routes.login);
	// avoid showing component before routes.push()
	return <Fragment>{user ? children : null}</Fragment>;
};

interface WrapperProps {
	children?: ReactNode;
}

// this is your App.js (global react logic goes here)
const Wrapper = ({ children }: WrapperProps) => {
	const dispatch = useDispatch();
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			dispatch(setUser(user ? { email: user.email } : null));
			!authInitialized && setAuthInitialized(true);
		});
		return () => unsuscribe();
	}, []);

	return <Fragment>{authInitialized ? children : null}</Fragment>;
};
