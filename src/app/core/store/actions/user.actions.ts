import { createAction, props } from '@ngrx/store';
import {
  IUser, IUserLogin, IUserRequest,
} from '../../models/user.model';

export const loadUser = createAction(
  '[User] Load User',
  props<{ userId: string }>(),
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: IUser }>(),
);

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: IUserLogin }>(),
);

export const signUpUser = createAction(
  '[User] Sign Up User',
  props<{ user: IUserRequest }>(),
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ userId: string, user: IUserRequest }>(),
);

export const removeUser = createAction(
  '[User] Remove Data',
  props<{ id: string }>(),
);

export const cleanUserStore = createAction(
  '[User] Clear Data',
);
export const userRequestFailed = createAction(
  '[User] User Filed',
  props<{ error: string }>(),
);
