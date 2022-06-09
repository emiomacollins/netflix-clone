import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { routes } from '../constants/routes';
import { getUser } from '../redux/slices/user/userSlice';

interface ProtectRoutesProps {
	exclude?: string[];
	children: ReactNode;
}

export default function ProtectRoutes({ exclude, children }: ProtectRoutesProps) {
	// auth will be initialized before this component renders
	const router = useRouter();
	const { pathname } = router;
	const user = useSelector(getUser);

	// if url is not protected return Component
	if (exclude?.includes(pathname)) return <Fragment>{children}</Fragment>;
	// if url is protected & user is not logged in redirect
	if (!user) router.push(routes.login);
	// avoid showing component before routes.push() executes
	return <Fragment>{user ? children : null}</Fragment>;
}
