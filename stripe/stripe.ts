import {
	createCheckoutSession,
	getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { app } from '../firebase/firebase';

const StripePayments = getStripePayments(app, {
	customersCollection: 'customers',
	productsCollection: 'products',
});

export async function createCheckOutUrl(priceId: string) {
	const { url } = await createCheckoutSession(StripePayments, {
		price: priceId,
		success_url: window.location.origin,
		cancel_url: window.location.origin,
	});
	return url;
}

export default StripePayments;
