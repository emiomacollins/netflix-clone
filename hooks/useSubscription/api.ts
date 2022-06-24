import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../lib/firebase/firebase';

export async function fetchSubscription(uid: string) {
	const subscriptionsRef = collection(firestore, `customers/${uid}/subscriptions`);
	const snapshot = await getDocs(subscriptionsRef);
	const subscriptions = snapshot.docs.map((doc) => doc.data());
	const currentSubscription = subscriptions.find(({ status }) => {
		return status === 'active';
	});

	return currentSubscription;
}
