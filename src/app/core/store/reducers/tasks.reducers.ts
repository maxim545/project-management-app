import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  addTask,
  addTasksSuccess,
  deleteTasksSuccess,
  editTask,
  editTasksSuccess,
  loadTasks, loadTasksSuccess, updateTasksOrder, updateTasksOrderSuccess,
} from '../actions/tasks.actions';
import { ITask } from '../../models/board.model';
import { addColumnSuccess } from '../actions/columns.actions';

export interface TaskState extends EntityState<ITask> {
  error: string | null;
  isLoading: boolean,
}

export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  selectId: (task) => task._id,
  sortComparer: (a, b) => a.order - b.order,
});

export const initialState: TaskState = adapter.getInitialState({
  error: null,
  isLoading: false,
});

export const taskReducer = createReducer(
  initialState,

  on(loadTasks, (state) => ({ ...state, isLoading: true })),

  on(loadTasksSuccess, (state, actions) => adapter.setAll(actions.tasks, { ...state, isLoading: false })),

  on(addTask, (state) => ({ ...state, isLoading: true })),

  on(addTasksSuccess, (state, action) => adapter.addOne(action.task, { ...state, isLoading: false })),

  on(editTask, (state) => ({ ...state, isLoading: true })),

  on(editTasksSuccess, (state, action) => adapter.updateOne(
    {
      id: action.task._id,
      changes: action.task,
    },
    {
      ...state,
      isLoading: false,
    },
  )),

  on(updateTasksOrder, (state) => ({ ...state, isLoading: true })),

  on(updateTasksOrderSuccess, (state, action) => adapter.updateMany(action.tasks.map((task) => ({ id: task._id, changes: task })), {
    ...state,
    isLoading: false,
  })),

  on(deleteTasksSuccess, (state, action) => adapter.removeOne(action.taskId, state)),

);

export const taskStateSelector = createFeatureSelector<TaskState>('tasks');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
