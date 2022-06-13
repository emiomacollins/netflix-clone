import { loadStripe } from '@stripe/stripe-js';

export async function getStripe() {
	const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
	return await loadStripe(key || '');
}
