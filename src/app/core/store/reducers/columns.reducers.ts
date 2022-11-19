import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IColumn } from '../../models/board.model';
import {
  addColumnSuccess, clearColumns, columnFailed, deleteColumnSuccess, editColumnSuccess, loadColumns, loadColumnsSuccess, updateColumnsSetSuccess, updateTasksSet, updTasksBetweenColumns,
} from '../actions/columns.actions';

export interface ColumnState extends EntityState<IColumn> {
  error: string | null;
  loading: boolean,
}

export const adapter: EntityAdapter<IColumn> = createEntityAdapter<IColumn>({
  selectId: (column) => column._id,
  sortComparer: (a, b) => a.order - b.order,
});

export const initialState: ColumnState = adapter.getInitialState({
  error: null,
  loading: false,
});

export const columnReducer = createReducer(
  initialState,

  on(loadColumns, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadColumnsSuccess, (state, actions) => adapter.setAll(actions.columns, {
    ...state,
    loading: false,
  })),

  on(addColumnSuccess, (state, action) => adapter.addOne(action.column, state)),

  on(updateTasksSet, (state) => ({
    ...state,
    loading: true,
  })),

  on(updTasksBetweenColumns, (state) => ({
    ...state,
    loading: true,
  })),

  on(editColumnSuccess, (state, action) => adapter.updateOne(
    {
      id: action.columnId,
      changes: action.column,
    },
    {
      ...state,
      loading: false,
    },
  )),

  on(updateColumnsSetSuccess, (state, action) => adapter.updateMany(action.columns.map((column) => ({ id: column._id, changes: column })), {
    ...state,
    loading: false,
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
