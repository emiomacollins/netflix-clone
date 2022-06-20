import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../../constants/home/types';
import { RootState } from '../../store';

interface State {
	modalMovie: Movie | null;
	searchQuery: string;
}

const initialState: State = {
	modalMovie: null,
	searchQuery: '',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setModalMovie(state, { payload: movie }: PayloadAction<Movie | null>) {
			state.modalMovie = movie;
		},
		setSearchQuery(state, { payload: query }: PayloadAction<string>) {
			state.searchQuery = query;
		},
	},
});

export const { setModalMovie, setSearchQuery } = uiSlice.actions;
const uiReducer = uiSlice.reducer;
export default uiReducer;

const getState = (store: RootState) => store.ui;
export const getModalMovie = createSelector(getState, ({ modalMovie }) => modalMovie);
export const getSearchQuery = createSelector(getState, ({ searchQuery }) => searchQuery);
