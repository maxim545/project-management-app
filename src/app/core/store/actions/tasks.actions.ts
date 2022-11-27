import { createAction, props } from '@ngrx/store';
import {
  IColumn, IColumnResponse, ITask, ITaskRequest, ITaskSet,
} from '../../models/board.model';

export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ id: string }>(),
);

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ITask[] }>(),
);

export const updateTasksOrder = createAction(
  '[Task] Edit Tasks order',
  props<{ tasks: ITaskSet[] }>(),
);

export const updateTasksOrderSuccess = createAction(
  '[Task] Edit Set Tasks order Success',
  props<{ tasks: ITask[] }>(),
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ column: IColumn, task: ITaskRequest }>(),
);

export const addTasksSuccess = createAction(
  '[Task] Add Tasks Success',
  props<{ task: ITask }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: ITask }>(),
);

export const editTasksSuccess = createAction(
  '[Task] edit Tasks Success',
  props<{ task: ITask }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: ITask }>(),
);

export const deleteTasksSuccess = createAction(
  '[Columns] Delete Tasks Success',
  props<{ taskId: string }>(),
);
