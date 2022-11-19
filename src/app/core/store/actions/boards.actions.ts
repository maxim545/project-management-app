import { createAction, props } from '@ngrx/store';
import {
  IBoard, IBoardRequest, IColumn, IColumnRequest, ITaskPutRequest, ITaskRequest,
} from '../../models/board.model';

export const loadBoards = createAction(
  '[Board] Load Boards',
  props<{ userId: string }>(),
);

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: IBoard[] }>(),
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: IBoardRequest }>(),
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
  props<{ id: string, board: IBoardRequest }>(),
);

export const editBoardSuccess = createAction(
  '[Board] Edit Board Success',
  props<{ id: string, board: IBoard }>(),
);

export const boardFailed = createAction(
  '[Board] Board Failed',
  props<{ error: string }>(),
);

export const clearBoards = createAction(
  '[Columns] Boards Clear',
);

/* export const getCurrentBoard = createAction(
  '[Board] Get Current Board',
  props<{ id: string }>(),
);

export const getCurrentBoardSuccess = createAction(
  '[Board] Get Current Board Success',
  props<{ board: IBoard }>(),
); */
