export interface User {
	uid: string;
	email: string | null;
	isSubscribed: boolean;
	createdAt: string;
}

export interface State {
	user: User | null;
}
