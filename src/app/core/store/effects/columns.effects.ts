import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck,
} from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { loadColumns, loadColumnsSuccess } from '../actions/columns.actions';

@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadColumns$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadColumns),
      switchMap(({ id }) => this.apiService
        .getAllColumns(id)
        .pipe(
          map((columns) => loadColumnsSuccess({ columns })),
          catchError(() => EMPTY),
        )),
    ),
  );
}
