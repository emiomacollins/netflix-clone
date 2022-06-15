import { Product } from '@stripe/firestore-stripe-payments';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { auth, firestore } from '../../firebase/firebase';
import { getStripe } from '../../stripe/stripe';

interface Props {
	selectedPlan: Product;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default async function checkout({ selectedPlan, setIsLoading }: Props) {
	setIsLoading(true);
	// get the selected plan's priceId form products collection
	const priceRef = collection(firestore, `products/${selectedPlan.id}/prices`);
	const snapshot = await getDocs(priceRef);
	const priceId = snapshot.docs[0].id;

	// in the current users document inside the customers collection
	// get the checkout_session collection ref
	const checkoutCollectionRef = collection(
		firestore,
		`customers/${auth.currentUser?.uid}/checkout_sessions`
	);

	// add a new document to the collection reperesenting a new checkout session
	const checkoutDocumentRef = await addDoc(checkoutCollectionRef, {
		price: priceId,
		success_url: window.location.origin,
		cancel_url: window.location.origin,
	});

	// the firebase extension auto dectects it and generates a sessionId field
	// it can take a few seconds to be generated so we listen with onSnapshot
	// we use that sessionId & stripe to redirect to the checkout page for the selected plan
	onSnapshot(checkoutDocumentRef, async (snapshot) => {
		const { sessionId } = snapshot.data() || {};
		const stripe = await getStripe();
		await stripe?.redirectToCheckout({ sessionId });
		setIsLoading(false);
	});
}
