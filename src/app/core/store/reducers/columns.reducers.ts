import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { IColumn } from '../../models/board.model';
import {
  addColumnSuccess, deleteColumnSuccess, editColumnSuccess, getCurrentColumnSuccess, loadColumns, loadColumnsSuccess, loadTasksSuccess,
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

  on(editColumnSuccess, (state, { columnId, column }) => {
    const columnIndex = state.columns.findIndex((item) => item.id === columnId);
    const updatedItems = [...state.columns];
    updatedItems[columnIndex] = column;
    return ({
      ...state,
      columns: updatedItems,
    });
  }),

  on(getCurrentColumnSuccess, (state, { column }) => {
    const columnIndex = state.columns.findIndex((item) => item.id === column.id);
    const updatedItems = [...state.columns];
    updatedItems[columnIndex] = column;
    return ({
      ...state,
      columns: updatedItems,
    });
  }),

  /* on(loadTasksSuccess, (state, { columnId, tasks }) => {
    const column = state.columns.find((item) => item.id === columnId) as IColumn;
    const newColumn = {
      ...column,
      tasks,
    };
    return ({
      ...state,
      columns: [...state.columns, newColumn],
    });
  }), */

);
