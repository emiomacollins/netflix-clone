import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { routes } from '../constants/routes';
import { getUser } from '../lib/redux/slices/user/userSlice';

interface ProtectRoutesProps {
	children: ReactNode;
	exclude?: string[];
}

export default function ProtectRoutes({ exclude, children }: ProtectRoutesProps) {
	// auth will be initialized before this component renders
	const router = useRouter();
	const user = useSelector(getUser);

	if (exclude?.includes(router.pathname)) return <Fragment>{children}</Fragment>;
	if (!user) router.push(routes.login);

	return <Fragment>{user ? children : null}</Fragment>;
}
