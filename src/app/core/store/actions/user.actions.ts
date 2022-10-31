import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user.model';

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
  props<{ user: IUser }>(),
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUser }>(),
);

export const removeUserStore = createAction(
  '[User] Clear Data',
);
