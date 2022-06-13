import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { routes } from '../constants/routes';
import { Subscription } from '../redux/slices/user/types';
import { getUser } from '../redux/slices/user/userSlice';

interface Props {
	children: ReactNode;
	exclude?: string[];
}

export default function WithSubscription({ children, exclude }: Props) {
	const user = useSelector(getUser);
	const router = useRouter();
	const { subscriptions } = user || {};

	if (exclude?.includes(router.pathname)) return <Fragment>{children}</Fragment>;

	if (!subscriptions?.find((subscription: Subscription) => {})) {
		router.push(routes.plans);
	}

	return <Fragment>{subscriptions ? children : null}</Fragment>;
}
