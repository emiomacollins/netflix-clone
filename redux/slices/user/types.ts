export interface User {
	uid: string;
	email: string | null;
	isSubscribed: boolean;
}

export interface State {
	user: User | null;
}
