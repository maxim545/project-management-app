import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck,
} from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import {
  addColumn, addColumnSuccess, deleteColumn, deleteColumnSuccess, loadColumns, loadColumnsSuccess,
} from '../actions/columns.actions';

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

  addColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(addColumn),
      switchMap(({ id, column }) => this.apiService
        .createColumn(id, column)
        .pipe(
          map((column) => addColumnSuccess({ column })),
          catchError(() => EMPTY),
        )),
    ),
  );

  deleteColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteColumn),
      switchMap(({ boardId, columnId }) => this.apiService
        .deleteColumn(boardId, columnId)
        .pipe(
          map(() => deleteColumnSuccess({ columnId })),
          catchError(async (err) => err),
        )),
    ),
  );
}
