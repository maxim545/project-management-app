import { IBoard } from '../models/board.model';

export interface BoardState {
  boards: IBoard[],
  error: string | null
}

export const initialState: BoardState = {
  boards: [],
  error: null,
};
