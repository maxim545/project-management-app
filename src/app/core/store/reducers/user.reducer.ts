import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { IUser } from '../../models/user.model';
import {
  loadUser, loadUserSuccess, cleanUserStore, userRequestFailed,
} from '../actions/user.actions';

export interface UserState {
  user: IUser | null,
  error: string | null;
  isLoading: boolean
}

export const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isLoading: false,
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
  })),
);
