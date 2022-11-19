import { createAction, props } from '@ngrx/store';
import {
  IColumn, IColumnRequest, IColumnResponse, IColumnSet, ITask, ITaskPutRequest, ITaskRequest, ITaskSet,
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
  props<{ id: string, column: IColumnRequest }>(),
);

export const addColumnSuccess = createAction(
  '[Columns] Add Columns Success',
  props<{ column: IColumn }>(),
);

export const editColumn = createAction(
  '[Columns] Edit Column',
  props<{ boardId: string, column: IColumn }>(),
);

export const editColumnSuccess = createAction(
  '[Columns] Edit Column Success',
  props<{ columnId: string, column: IColumn }>(),
);

export const updateColumnsSet = createAction(
  '[Columns] Edit Set Columns',
  props<{ columns: IColumnSet[] }>(),
);

export const updateColumnsSetSuccess = createAction(
  '[Columns] Edit Set Columns Success',
  props<{ columns: IColumnResponse[] }>(),
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

export const clearColumns = createAction(
  '[Columns] Columns Clear',
);

/* -----------TASKS----------- */

export const addTask = createAction(
  '[Task] Add Task',
  props<{ column: IColumn, task: ITaskRequest }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ column: IColumn, task: ITask }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ column: IColumn, task: ITask }>(),
);

export const updateTasksSet = createAction(
  '[Columns] Edit Set Tasks',
  props<{ column: IColumn, tasks: ITaskSet[] }>(),
);

export const updTasksBetweenColumns = createAction(
  '[Columns] Edit Tasks betwwen columns',
  props<{ columns: IColumn[], tasks: ITaskSet[] }>(),
);
