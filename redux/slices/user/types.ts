interface UserType {
	email: string | null;
}

export type User = UserType | null;

export interface State {
	user: User;
}
