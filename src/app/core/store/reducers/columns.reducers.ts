import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IColumn } from '../../models/board.model';
import {
  addColumnSuccess, deleteColumnSuccess, editColumnSuccess, loadColumns, loadColumnsSuccess,
} from '../actions/columns.actions';

export interface ColumnState extends EntityState<IColumn> {
  error: string | null;
}

export const adapter: EntityAdapter<IColumn> = createEntityAdapter<IColumn>({
  selectId: (column) => column.id,
  sortComparer: (a, b) => a.order - b.order,
});

export const initialState: ColumnState = adapter.getInitialState({
  error: null,
});

export const columnReducer = createReducer(
  initialState,
  on(loadColumns, (state) => ({ ...state })),

  on(loadColumnsSuccess, (state, actions) => adapter.setAll(actions.columns, state)),

  on(addColumnSuccess, (state, action) => adapter.addOne(action.column, state)),

  on(deleteColumnSuccess, (state, action) => adapter.removeOne(action.columnId, state)),

  on(editColumnSuccess, (state, action) => adapter.updateOne({ id: action.columnId, changes: action.column }, state)),

);

export const columnStateSelector = createFeatureSelector<ColumnState>('columns');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
