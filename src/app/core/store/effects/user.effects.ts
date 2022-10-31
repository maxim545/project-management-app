import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from,
} from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import {
  loadUser, loadUserSuccess, removeUserStore,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  currentUserId = localStorage.getItem('uniq_userId') || '';

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
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

  removeUserStore$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeUserStore),
    ),
    { dispatch: false },
  );
}
