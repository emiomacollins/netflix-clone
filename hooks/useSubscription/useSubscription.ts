import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getUser } from '../../lib/redux/slices/user/userSlice';
import { fetchSubscription } from './api';

export function useSubscription() {
	const user = useSelector(getUser);
	return useQuery([`getSubscriptions`, user?.uid], () => fetchSubscription(user?.uid));
}
