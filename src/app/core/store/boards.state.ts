import { IBoard, IBoardBybId } from '../models/board.model';

export interface BoardState {
  boards: IBoardBybId[],
  error: string | null
}

export const initialState: BoardState = {
  boards: [],
  error: null,
};
