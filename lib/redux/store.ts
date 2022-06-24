import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui/uiSlice';
import { userReducer } from './slices/user/userSlice';

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
		ui: uiReducer,
	}),
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({ serializableCheck: false });
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
