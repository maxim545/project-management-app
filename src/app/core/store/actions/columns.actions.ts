import { createAction, props } from '@ngrx/store';
import {
  IColumn,
} from '../../models/board.model';

export const loadColumns = createAction(
  '[Columns] Load Columns',
  props<{ id: string }>(),
);

export const loadColumnsSuccess = createAction(
  '[Columns] Load Columns Success',
  props<{ columns: IColumn[] }>(),
);

export const columnFailed = createAction(
  '[Columns] Columns Failed',
  props<{ error: string }>(),
);
