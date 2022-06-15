import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { routes } from '../constants/routes';
import { auth } from '../lib/firebase/firebase';

interface ProtectRoutesProps {
	children: ReactNode;
	exclude?: string[];
}

export default function ProtectRoutes({ exclude, children }: ProtectRoutesProps) {
	// auth will be initialized before this component renders
	const router = useRouter();
	const user = auth.currentUser;

	if (exclude?.includes(router.pathname)) return <Fragment>{children}</Fragment>;
	if (!user) router.push(routes.login);

	return <Fragment>{user ? children : null}</Fragment>;
}
