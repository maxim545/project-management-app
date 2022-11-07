import { IBoardResponse } from '../models/board.model';

export interface BoardState {
  boards: IBoardResponse[],
  error: string | null
}

export const initialState: BoardState = {
  boards: [],
  error: null,
};
