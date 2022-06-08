import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { State, User } from './types';

const initialState: State = {
	user: null,
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload: user }: PayloadAction<User>) {
			state.user = user;
		},
	},
});

export const userReducer = user.reducer;
export const { setUser } = user.actions;

const getState = (store: RootState) => store.user;
export const getUser = createSelector(getState, ({ user }) => user);
