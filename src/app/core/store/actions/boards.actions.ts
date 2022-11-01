import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardForm } from '../../models/board.model';

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
