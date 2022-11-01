import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardForm } from '../../models/board.model';

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

export const boardFailed = createAction(
  '[Board] Board Failed',
  props<{ error: string }>(),
);
