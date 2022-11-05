import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  loadUser, loadUserSuccess, cleanUserStore, loginUserFailed, signUpUserFailed,
} from '../actions/user.actions';
import { initialState, UserState } from '../user.state';

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
