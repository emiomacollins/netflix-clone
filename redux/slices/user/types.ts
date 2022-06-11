export interface User {
	email: string | null;
	plan: Plan | null;
}

export interface State {
	user: User | null;
}

export interface Plan {
	title: string;
	price: number;
	resolution: string;
	otherDevice: boolean;
}
