import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { routes } from '../constants/routes';
import { getUser } from '../lib/redux/slices/user/userSlice';

interface Props {
	children: ReactNode;
	exclude?: string[];
}

export default function WithSubscription({ children, exclude }: Props) {
	const user = useSelector(getUser);
	const router = useRouter();

	if (exclude?.includes(router.pathname)) return <Fragment>{children}</Fragment>;

	if (!user?.currentSubscription) {
		router.push(routes.plans);
		return null;
	}

	return <Fragment>{children}</Fragment>;
}
