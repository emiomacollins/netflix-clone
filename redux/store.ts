import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user/user';

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
	}),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
