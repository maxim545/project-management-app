import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  addBoard, addBoardSuccess,
} from '../actions/boards.actions';
import { initialState } from '../boards.state';

export const boardReducer = createReducer(
  initialState,
  on(addBoardSuccess, (state, { board }) => ({
    ...state,
    boards: [...state.boards, { ...board }],
  })),

);
