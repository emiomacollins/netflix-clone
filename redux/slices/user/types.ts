import { Plan } from '../../../pages/plans/types';

export interface User {
	email: string | null;
	plan: Plan | null;
}

export interface State {
	user: User | null;
}
