import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import {
  loadUser, loadUserSuccess, cleanUserStore,
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
  on(cleanUserStore, (state) => ({
    ...state,
    user: null,
  })),
);
