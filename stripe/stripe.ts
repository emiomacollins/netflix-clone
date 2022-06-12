import {
	createCheckoutSession,
	getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getApp } from 'firebase/app';

// stripe instance
const app = getApp();
const StripePayments = getStripePayments(app, {
	// names of the firestore collections where plans & customer details are stored
	customersCollection: 'customers',
	productsCollection: 'products',
});

export async function createCheckOutUrl(priceId: string) {
	const { url } = await createCheckoutSession(StripePayments, {
		price: priceId,
		success_url: window.location.origin,
		cancel_url: window.location.origin,
		// TODO: try if this will work
		// success_url: routes.home,
		// cancel_url: routes.home,
		// TODO: catch errors in react
	});
	return url;
}

export default StripePayments;
