import { createAction, props } from '@ngrx/store';
import {
  IColumn, IColumnPostRequest, IColumnPutRequest, IColumnResponse, ITask, ITaskPutRequest, ITaskRequest,
} from '../../models/board.model';

export const loadColumns = createAction(
  '[Columns] Load Columns',
  props<{ id: string }>(),
);

export const loadColumnsSuccess = createAction(
  '[Columns] Load Columns Success',
  props<{ columns: IColumn[] }>(),
);

export const addColumn = createAction(
  '[Columns] Add Columns',
  props<{ id: string, column: IColumnPostRequest }>(),
);

export const addColumnSuccess = createAction(
  '[Columns] Add Columns Success',
  props<{ column: IColumnResponse }>(),
);

export const editColumn = createAction(
  '[Columns] Edit Column',
  props<{ boardId: string, columnId: string, column: IColumn }>(),
);

export const editColumnSuccess = createAction(
  '[Columns] Edit Column Success',
  props<{ columnId: string, column: IColumn }>(),
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ boardId: string, columnId: string }>(),
);

export const deleteColumnSuccess = createAction(
  '[Columns] Delete Column Success',
  props<{ columnId: string }>(),
);

export const columnFailed = createAction(
  '[Columns] Columns Failed',
  props<{ error: string }>(),
);

/* -----------TASKS----------- */

export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardId: string, columnId: string, task: ITaskRequest }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardId: string, columnId: string, taskId: string }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ boardId: string, columnId: string, taskId: string, task: ITaskPutRequest }>(),
);
