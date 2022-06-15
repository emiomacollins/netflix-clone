import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { firestore } from '../firebase/firebase';
import { getUser } from '../redux/slices/user/userSlice';

export function useSubscription() {
	const user = useSelector(getUser);
	return useQuery(`getSubscriptions-${user?.uid}`, async () => {
		const subscriptionsRef = collection(
			firestore,
			`customers/${user?.uid}/subscriptions`
		);

		const snapshot = await getDocs(subscriptionsRef);
		const subscriptions = snapshot.docs.map((doc) => doc.data());

		const currentSubscription = subscriptions.find(({ status }) => {
			return status === 'active';
		});

		return currentSubscription;
	});
}
