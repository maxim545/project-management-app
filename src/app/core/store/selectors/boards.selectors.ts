import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { BoardState } from '../boards.state';

export const getBoardStore = createFeatureSelector<BoardState>('boards');
export const getCurrentBoards = createSelector(
  getBoardStore,
  (state: BoardState) => state.boards,
);
