import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { addColumnSuccess, loadColumns, loadColumnsSuccess } from '../actions/columns.actions';
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

);
