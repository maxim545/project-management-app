import { createAction, props } from '@ngrx/store';
import {
  IUser, IUserData, IUserLogin, IUserRegister,
} from '../../models/user.model';

export const loadUser = createAction(
  '[User] Load User',
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: IUser }>(),
);

export const loginUser = createAction(
  '[User] Login User',
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: IUserLogin }>(),
);

export const loginUserFailed = createAction(
  '[User] Login User Success',
  props<{ user: IUserLogin }>(),
);

export const signUpUser = createAction(
  '[User] signUp User',
);

export const signUpUserSuccess = createAction(
  '[User] signUp User Success',
  props<{ user: IUserRegister }>(),
);

export const saveUser = createAction(
  '[User] save User Success',
  props<{ user: IUserLogin }>(),
);

export const updateUser = createAction(
  '[User] Update User Success',
  props<{ user: IUserData }>(),
);

export const removeUser = createAction(
  '[User] remove Data',
  props<{ id: string }>(),
);

export const cleanUserStore = createAction(
  '[User] Clear Data',
);
