import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IColumn } from '../../models/board.model';
import {
  addColumnSuccess, clearColumns, columnFailed, deleteColumnSuccess, editColumnSuccess, loadColumns, loadColumnsSuccess, updateColumnsSet, updateColumnsSetSuccess,
} from '../actions/columns.actions';

export interface ColumnState extends EntityState<IColumn> {
  error: string | null;
  isLoading: boolean,
}

export const adapter: EntityAdapter<IColumn> = createEntityAdapter<IColumn>({
  selectId: (column) => column._id,
  sortComparer: (a, b) => a.order - b.order,
});

export const initialState: ColumnState = adapter.getInitialState({
  error: null,
  isLoading: false,
});

export const columnReducer = createReducer(
  initialState,

  on(loadColumns, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(loadColumnsSuccess, (state, actions) => adapter.setAll(actions.columns, {
    ...state,
    isLoading: false,
  })),

  on(addColumnSuccess, (state, action) => adapter.addOne(action.column, state)),

  on(editColumnSuccess, (state, action) => adapter.updateOne(
    {
      id: action.column._id,
      changes: action.column,
    },
    {
      ...state,
      isLoading: false,
    },
  )),

  on(updateColumnsSet, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(updateColumnsSetSuccess, (state, action) => adapter.updateMany(action.columns.map((column) => (
    {
      id: column._id,
      changes: column,
    }
  )), {
    ...state,
    isLoading: false,
  })),

  on(deleteColumnSuccess, (state, action) => adapter.removeOne(action.columnId, state)),

  on(clearColumns, (state) => adapter.removeAll(state)),

  on(columnFailed, (state, action) => (
    {
      ...state,
      error: action.error,
      isLoading: false,
    }
  )),
);

export const columnStateSelector = createFeatureSelector<ColumnState>('columns');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
