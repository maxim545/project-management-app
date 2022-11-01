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
  '[User] Login User Filed',
  props<{ error: Error }>(),
);

export const signUpUser = createAction(
  '[User] Sign Up User',
);

export const signUpUserSuccess = createAction(
  '[User] Sign Up User Success',
  props<{ user: IUserRegister }>(),
);

export const signUpUserFailed = createAction(
  '[User] Sign Up User Filed',
  props<{ error: Error }>(),
);

export const saveUser = createAction(
  '[User] Save User',
  props<{ user: IUserLogin }>(),
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: IUserData }>(),
);

export const removeUser = createAction(
  '[User] Remove Data',
  props<{ id: string }>(),
);

export const cleanUserStore = createAction(
  '[User] Clear Data',
);
