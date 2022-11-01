import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IUser, IUserToken } from '../../models/user.model';
import { ApiService } from '../../services/api/api.service';
import {
  cleanUserStore,
  loadUser, loadUserSuccess, loginUser, loginUserSuccess, removeUser, saveUser, signUpUserSuccess, updateUser,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  currentUserId = localStorage.getItem('uniq_userId') || '';

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  loadUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUser),
      switchMap(() => this.apiService.getUserById(this.currentUserId).pipe(
        map((user) => loadUserSuccess({ user })),
        catchError(() => EMPTY),
      )),
    ),
  );

  loginUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginUserSuccess),
      switchMap(({ user }) => this.apiService.login(user).pipe(
        map((res) => {
          const response = res.body as IUserToken;
          localStorage.setItem('uniq_token', response.token);
          this.authService.loginUser(user);
          return saveUser({ user });
        }),
        catchError(async (err) => err),
      )),
    ),
  );

  signUpUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(signUpUserSuccess),
      switchMap(({ user }) => this.apiService.signUp(user).pipe(
        map(() => {
          this.authService.signUpUser(user);
          return loginUserSuccess({
            user: {
              login: user.login,
              password: user.password,
            },
          });
        }),
        catchError(async (err) => err),
      )),
    ),
  );

  saveUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(saveUser),
      switchMap(({ user }) => this.apiService.getUsers().pipe(
        map((res) => {
          const [responseUser] = res.filter((resUser) => resUser.login === user.login);
          localStorage.setItem('uniq_userId', responseUser.id);
          return loadUserSuccess({ user: responseUser });
        }),
        catchError(async (err) => err),
      )),
    ),
  );

  updateUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) => this.apiService.updateUser(user.id, {
        name: user.name,
        login: user.login,
        password: user.password,
      }).pipe(
        map((res) => loadUserSuccess({ user: (res.body as IUser) })),
        catchError(async (err) => err),
      )),
    ),
  );

  removeUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeUser),
      switchMap(({ id }) => this.apiService.deleteUser(id).pipe(
        map(() => {
          this.authService.logoutUser();
          return cleanUserStore();
        }),
        catchError(async (err) => err),
      )),
    ),
  );

  cleanUserStore$ = createEffect(
    () => this.actions$.pipe(
      ofType(cleanUserStore),
    ),
    { dispatch: false },
  );
}
