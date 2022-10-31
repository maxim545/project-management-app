import { createAction, props } from '@ngrx/store';
import { IUser, IUserLogin, IUserRegister } from '../../models/user.model';

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

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUser }>(),
);

export const removeUserStore = createAction(
  '[User] Clear Data',
);

export const saveToken = createAction(
  '[Token] Success',
);
