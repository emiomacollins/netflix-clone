import { Product } from '@stripe/firestore-stripe-payments';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { createCheckOutUrl } from '../../../stripe/stripe';

export async function checkout(selectedPlan: Product) {
	const pricesRef = collection(firestore, `products/${selectedPlan.id}/prices`);
	const snapshot = await getDocs(pricesRef);
	const priceId = snapshot.docs[0].id;
	const url = await createCheckOutUrl(priceId);
	window.location.assign(url);
}
