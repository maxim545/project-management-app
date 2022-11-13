import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBoard } from '../../models/board.model';
import {
  addBoard, addBoardSuccess, boardFailed, deleteBoard, deleteBoardSuccess, editBoardSuccess, loadBoards, loadBoardsSuccess,
} from '../actions/boards.actions';

export interface BoardState extends EntityState<IBoard> {
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const adapter: EntityAdapter<IBoard> = createEntityAdapter<IBoard>({
  selectId: (board) => board._id,
  sortComparer: false,
});

export const initialState: BoardState = adapter.getInitialState({
  error: null,
  isLoading: false,
  isLoggedIn: false,
});

export const boardReducer = createReducer(
  initialState,

  on(loadBoards, (state) => ({ ...state, isLoading: true })),

  on(loadBoardsSuccess, (state, actions) => adapter.setAll(actions.boards, { ...state, isLoading: false, isLoggedIn: true })),

  on(addBoardSuccess, (state, action) => adapter.addOne(action.board, state)),

  on(deleteBoardSuccess, (state, action) => adapter.removeOne(action.id, state)),

  on(editBoardSuccess, (state, action) => adapter.updateOne({ id: action.id, changes: action.board }, state)),

  on(boardFailed, (state, action) => ({ ...state, error: action.error, isLoading: false })),

);

export const boardStateSelector = createFeatureSelector<BoardState>('boards');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
