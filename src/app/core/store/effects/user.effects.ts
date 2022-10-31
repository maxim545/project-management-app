import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IUser, IUserToken } from '../../models/user.model';
import { ApiService } from '../../services/api/api.service';
import {
  loadUser, loadUserSuccess, loginUser, loginUserSuccess, removeUserStore, saveToken, saveUser, signUpUserSuccess,
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
        catchError(() => of(removeUserStore())),
      )),
    ),
  );

  loginUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginUserSuccess),
      switchMap(({ user }) => this.apiService.login(user).pipe(
        map((res) => {
          this.authService.loginUser((res.body) as IUserToken, user);
          return saveToken();
        }),
        catchError(() => EMPTY),
      )),
    ),
  );

  signUpUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(signUpUserSuccess),
      switchMap(({ user }) => this.apiService.signUp(user).pipe(
        map((res) => {
          const currentUser = res.body as IUser;
          this.authService.signUpUser(user, currentUser.id);
          return loadUserSuccess({ user: currentUser });
        }),
        catchError(() => EMPTY),
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
        catchError(() => EMPTY),
      )),
    ),
  );

  removeUserStore$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeUserStore),
    ),
    { dispatch: false },
  );
}
