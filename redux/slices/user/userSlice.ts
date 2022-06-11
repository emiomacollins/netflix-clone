import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { State, User } from './types';

const initialState: State = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload: user }: PayloadAction<User | null>) {
			state.user = user;
		},
	},
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;

const getState = (store: RootState) => store.user;
export const getUser = createSelector(getState, ({ user }) => user);
