import { DocumentData } from 'firebase/firestore';

export interface User {
	uid: string;
	email: string | null;
	currentSubscription: DocumentData | undefined;
	createdAt: string;
}

export interface State {
	user: User | null;
}
