import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../constants/home/types';
import { RootState } from '../../store';

interface State {
	modalMovie: Movie | null;
}

const initialState: State = {
	modalMovie: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setModalMovie(state, { payload: movie }: PayloadAction<Movie | null>) {
			state.modalMovie = movie;
		},
	},
});

export const { setModalMovie } = uiSlice.actions;
const uiReducer = uiSlice.reducer;
export default uiReducer;

const getState = (store: RootState) => store.ui;
export const getModalMovie = createSelector(getState, ({ modalMovie }) => modalMovie);
