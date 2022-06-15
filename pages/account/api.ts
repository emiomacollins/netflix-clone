import { getFunctions, httpsCallable } from 'firebase/functions';
import { routes } from '../../constants/routes';
import { app } from '../../firebase/firebase';

export async function redirectToManageSubscription() {
	const cloudFunctionInstance = getFunctions(app, 'us-central1');
	const cloudFunction = httpsCallable(
		cloudFunctionInstance,
		'ext-firestore-stripe-payments-createPortalLink'
	);

	const { data }: any = await cloudFunction({
		returnUrl: `${window.location.origin}${routes.account}`,
	});

	window.location.assign(data.url);
}
