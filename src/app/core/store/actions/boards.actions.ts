import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardBybId, IBoardForm } from '../../models/board.model';

export const loadBoards = createAction(
  '[Board] Load Boards',
);

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: IBoard[] }>(),
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: IBoardForm }>(),
);

export const addBoardSuccess = createAction(
  '[Board] Add Board Success',
  props<{ board: IBoard }>(),
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ id: string }>(),
);

export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success',
  props<{ id: string }>(),
);

export const editBoard = createAction(
  '[Board] Edit Board',
  props<{ board: IBoard }>(),
);

export const editBoardSuccess = createAction(
  '[Board] Edit Board Success',
  props<{ board: IBoard }>(),
);

export const getCurrentBoard = createAction(
  '[Board] Get Current Board',
  props<{ id: string }>(),
);

export const getCurrentBoardSuccess = createAction(
  '[Board] Get Current Board Success',
  props<{ board: IBoardBybId }>(),
);

export const boardFailed = createAction(
  '[Board] Board Failed',
  props<{ error: string }>(),
);
