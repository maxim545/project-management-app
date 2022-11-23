import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { IUser } from '../../models/user.model';
import {
  cleanUserStore, userRequestFailed, loginUser, updateUser, loadUsersSuccess, loadUsers, updateUserSuccess,
} from '../actions/user.actions';

export interface UserState {
  users: IUser[] | null;
  user: IUser | null,
  error: string | null;
  isLoading: boolean,
  isLoggedIn: boolean
}

export const initialState: UserState = {
  users: null,
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadUsersSuccess, (state, { users, user }) => ({
    ...state,
    users,
    user,
    error: null,
    isLoading: false,
    isLoggedIn: true,
  })),
  /* on(updateUser, (state) => ({
    ...state,
    isLoading: true,
  })), */
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isLoading: false,
  })),
  on(loginUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(updateUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userRequestFailed, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(cleanUserStore, (state) => ({
    ...state,
    user: null,
    error: null,
    isLoggedIn: false,
  })),
);
