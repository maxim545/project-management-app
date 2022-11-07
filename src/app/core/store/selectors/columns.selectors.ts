import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { ColumnState, columnStateSelector, selectAll } from '../reducers/columns.reducers';

export const getAllColumns = createSelector(
  columnStateSelector,
  selectAll,
);
