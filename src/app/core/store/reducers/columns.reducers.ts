import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  addColumnSuccess, deleteColumnSuccess, loadColumns, loadColumnsSuccess,
} from '../actions/columns.actions';
import { initialState } from '../columns.state';

export const columnReducer = createReducer(
  initialState,
  on(loadColumns, (state) => ({ ...state })),

  on(loadColumnsSuccess, (state, { columns }) => ({
    ...state,
    columns,
  })),

  on(addColumnSuccess, (state, { column }) => ({
    ...state,
    columns: [...state.columns, { ...column }],
  })),

  on(deleteColumnSuccess, (state, { columnId }) => ({
    ...state,
    columns: state.columns.filter((columns) => columns.id !== columnId),
  })),

);
