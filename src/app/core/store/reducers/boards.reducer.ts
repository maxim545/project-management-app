import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  addBoard, addBoardSuccess, deleteBoard, deleteBoardSuccess, loadBoards, loadBoardsSuccess,
} from '../actions/boards.actions';
import { initialState } from '../boards.state';

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state) => ({ ...state })),
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
  })),
  on(addBoardSuccess, (state, { board }) => ({
    ...state,
    boards: [...state.boards, { ...board }],
  })),
  on(deleteBoardSuccess, (state, { id }) => ({
    ...state,
    boards: state.boards.filter((boards) => boards.id !== id),
  })),
);
