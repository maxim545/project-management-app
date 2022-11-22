import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {
  selectAll, selectEntities, TaskState, taskStateSelector,
} from '../reducers/tasks.reducers';

export const getAllTasks = createSelector(
  taskStateSelector,
  selectAll,
);

export const selectEntity = (id: string) => createSelector(
  selectEntities,
  (entities) => entities[id],
);

export const getTaskLoadingStatus = createSelector(
  taskStateSelector,
  (state: TaskState) => state.isLoading,
);
