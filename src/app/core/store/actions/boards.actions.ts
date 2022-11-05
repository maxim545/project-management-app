import { createAction, props } from '@ngrx/store';
import {
  IBoard, IBoardBybId, IBoardForm, IColumn, IColumnPostRequest, IColumnPutRequest, ITaskPutRequest, ITaskRequest,
} from '../../models/board.model';

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

// COLUMNS

export const addColumn = createAction(
  '[Column] Add Column',
  props<{ boardId: string, column: IColumnPostRequest }>(),
);

export const editColumn = createAction(
  '[Column] Edit Column',
  props<{ boardId: string, columnId: string, column: IColumnPutRequest }>(),
);

export const deleteColumn = createAction(
  '[Column] Delete Column',
  props<{ boardId: string, columnId: string }>(),
);

/* export const deleteColumnSuccess = createAction(
  '[Column] Delete Column Success',
  props<{ boardId: string, columnId: string }>(),
); */

// TASKS

export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardId: string, columnId: string, task: ITaskRequest }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ boardId: string, columnId: string, taskId: string, task: ITaskPutRequest }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardId: string, columnId: string, taskId: string }>(),
);
