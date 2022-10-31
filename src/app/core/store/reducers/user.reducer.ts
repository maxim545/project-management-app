import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  loadUser, loadUserSuccess, removeUserStore, updateUserSuccess,
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
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(removeUserStore, (state) => ({
    ...state,
    user: null,
  })),
);
