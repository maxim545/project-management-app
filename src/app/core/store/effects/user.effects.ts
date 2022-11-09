import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, debounceTime, finalize,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { parseJwt } from '../../configs/tokenParse';
import { IUser, IUserToken } from '../../models/user.model';
import { ApiService } from '../../services/api/api.service';
import {
  cleanUserStore,
  loadUser, loadUserSuccess, loginUser, removeUser, signUpUser, updateUser, userRequestFailed,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
  ) { }

  loadUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUser),
      switchMap(({ userId }) => this.apiService
        .getUserById(userId)
        .pipe(
          map((user) => loadUserSuccess({ user })),
          catchError((error) => of(userRequestFailed({ error }))),
        )),
    ),
  );

  loginUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ user }) => this.apiService
        .login(user)
        .pipe(
          map((response) => {
            const userId = parseJwt(response.token);
            localStorage.setItem('uniq_token', response.token);
            localStorage.setItem('uniq_userId', userId);
            this.authService.loginUser(user);
            return loadUser({ userId });
          }),
          catchError((error) => of(userRequestFailed({ error }))),
        )),
    ),
  );

  signUpUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(signUpUser),
      switchMap(({ user }) => this.apiService
        .signUp(user)
        .pipe(
          map(() => loginUser({
            user: {
              login: user.login,
              password: user.password,
            },
          })),
          catchError((error) => of(userRequestFailed({ error }))),
        )),
    ),
  );

  updateUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) => this.apiService
        .updateUser(user.id, {
          name: user.name,
          login: user.login,
          password: user.password,
        }).pipe(
          map((resUser) => {
            this.authService.updateUser();
            return loadUserSuccess({ user: resUser });
          }),
          catchError((error) => of(userRequestFailed({ error }))),
        )),
    ),
  );

  removeUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeUser),
      switchMap(({ id }) => this.apiService
        .deleteUser(id)
        .pipe(
          map(() => cleanUserStore()),
          catchError((error) => of(userRequestFailed({ error }))),
        )),
    ),
  );

  cleanUserStore$ = createEffect(() => this.actions$.pipe(
    ofType(cleanUserStore),
    tap(() => {
      localStorage.clear();
      this.router.navigate(['welcome']);
    }),
  ), { dispatch: false });
}
