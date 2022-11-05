import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { ColumnState } from '../columns.state';

export const getColumntore = createFeatureSelector<ColumnState>('columns');
export const getCurrentColumns = createSelector(
  getColumntore,
  (state: ColumnState) => state.columns,
);
