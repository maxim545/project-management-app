import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { IBoard, IBoardBybId } from '../../models/board.model';
import {
  addBoard, addBoardSuccess, deleteBoard, deleteBoardSuccess, editBoardSuccess, getCurrentBoardSuccess, loadBoards, loadBoardsSuccess,
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

  on(editBoardSuccess, (state, { board }) => {
    const boardIndex = state.boards.findIndex((item) => item.id === board.id);
    const updatedItems = [...state.boards];
    updatedItems[boardIndex] = board;
    return ({
      ...state,
      boards: updatedItems,
    });
  }),

  on(getCurrentBoardSuccess, (state, { board }) => {
    const boardIndex = state.boards.findIndex((item) => item.id === board.id);
    const updatedItems = [...state.boards];
    updatedItems[boardIndex] = board;
    return ({
      ...state,
      boards: updatedItems,
    });
  }),

  on(deleteBoardSuccess, (state, { id }) => ({
    ...state,
    boards: state.boards.filter((boards) => boards.id !== id),
  })),

  /*  on(deleteColumnSuccess, (state, { boardId, columnId }) => {
    const board = state.boards.find((item) => item.id === boardId) as IBoardBybId;
    const columns = board?.columns?.filter((boards) => boards.id !== columnId);
    const updatedItems = [...state.boards];
    return ({
      ...state,
      boards: updatedItems,
    });
  }), */
);
