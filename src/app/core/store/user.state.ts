import { IUser } from '../models/user.model';

export interface UserState {
  user: IUser | null,
}

export const initialState: UserState = {
  user: null,
};
