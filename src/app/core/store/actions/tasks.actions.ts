import { createAction, props } from '@ngrx/store';
import {
  IColumn, IColumnResponse, ITask, ITaskRequest, ITaskSet,
} from '../../models/board.model';

export const loadTasks = createAction(
  '[Columns] Load Tasks',
  props<{ id: string }>(),
);

export const loadTasksSuccess = createAction(
  '[Columns] Load Tasks Success',
  props<{ tasks: ITask[] }>(),
);

export const updateTasksOrder = createAction(
  '[Columns] Edit Tasks order',
  props<{ tasks: ITaskSet[] }>(),
);

export const updateTasksOrderSuccess = createAction(
  '[Columns] Edit Set Tasks order Success',
  props<{ tasks: ITask[] }>(),
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ column: IColumn, task: ITaskRequest }>(),
);

export const addTasksSuccess = createAction(
  '[Columns] add Tasks Success',
  props<{ task: ITask }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: ITask }>(),
);

export const editTasksSuccess = createAction(
  '[Columns] edit Tasks Success',
  props<{ task: ITask }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: ITask }>(),
);

export const deleteTasksSuccess = createAction(
  '[Columns] delete Tasks Success',
  props<{ taskId: string }>(),
);
