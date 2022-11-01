import { IUser } from '../models/user.model';

export interface UserState {
  user: IUser | null,
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
};
