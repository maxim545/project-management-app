import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const getUserStore = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => state.user,
);

export const getUsers = createSelector(
  getUserStore,
  (state: UserState) => state.users,
);

export const getUserByLogin = (login: string) => createSelector(
  getUserStore,
  (state: UserState) => state.users?.find((user) => user.login === login),
);
