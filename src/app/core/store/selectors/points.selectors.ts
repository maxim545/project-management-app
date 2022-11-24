import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { PointState, pointStateSelector, selectAll } from '../reducers/points.reducers';

export const getAllPoints = createSelector(
  pointStateSelector,
  selectAll,
);

export const getPointsLoadingStatus = createSelector(
  pointStateSelector,
  (state: PointState) => state.isLoading,
);
