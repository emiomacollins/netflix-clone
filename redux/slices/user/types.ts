export interface Subscription {}

export interface User {
	email: string | null;
	subscriptions: Subscription[] | null;
}

export interface State {
	user: User | null;
}
