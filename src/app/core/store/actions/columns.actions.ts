import { createAction, props } from '@ngrx/store';
import {
  IColumn, IColumnPostRequest, IColumnResponse,
} from '../../models/board.model';

export const loadColumns = createAction(
  '[Columns] Load Columns',
  props<{ id: string }>(),
);

export const loadColumnsSuccess = createAction(
  '[Columns] Load Columns Success',
  props<{ columns: IColumn[] }>(),
);

export const addColumn = createAction(
  '[Columns] Add Columns',
  props<{ id: string, column: IColumnPostRequest }>(),
);

export const addColumnSuccess = createAction(
  '[Columns] Add Columns Success',
  props<{ column: IColumnResponse }>(),
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ boardId: string, columnId: string }>(),
);

export const deleteColumnSuccess = createAction(
  '[Columns] Delete Column Success',
  props<{ columnId: string }>(),
);

export const columnFailed = createAction(
  '[Columns] Columns Failed',
  props<{ error: string }>(),
);
