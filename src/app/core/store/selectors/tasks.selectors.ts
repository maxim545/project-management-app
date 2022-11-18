import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { selectAll, TaskState, taskStateSelector } from '../reducers/tasks.reducers';

export const getAllTasks = createSelector(
  taskStateSelector,
  selectAll,
);

export const getTaskLoadingStatus = createSelector(
  taskStateSelector,
  (state: TaskState) => state.isLoading,
);
