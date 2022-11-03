import { IColumn } from '../models/board.model';

export interface ColumnState {
  columns: IColumn[],
  error: string | null
}

export const initialState: ColumnState = {
  columns: [],
  error: null,
};
