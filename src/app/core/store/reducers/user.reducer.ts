import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { IUser } from '../../models/user.model';
import {
  loadUser, loadUserSuccess, cleanUserStore, loginUserFailed, signUpUserFailed,
} from '../actions/user.actions';

export interface UserState {
  user: IUser | null,
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state) => ({
    ...state,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(loginUserFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(signUpUserFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(cleanUserStore, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
);
