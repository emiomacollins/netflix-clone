import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../firebase/firebase';
import { getUser } from '../redux/slices/user/userSlice';

export async function useSubscriptions() {
	const user = useSelector(getUser);
	const subscriptionsRef = collection(
		firestore,
		`customers/${user?.uid}/subscriptions`
	);
	const snapshot = await getDocs(subscriptionsRef);
	return snapshot.docs.map((doc) => doc.data());
}
