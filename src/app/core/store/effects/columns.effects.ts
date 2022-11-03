import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take,
} from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import {
  addColumn, addColumnSuccess, deleteColumn, deleteColumnSuccess, editColumn, editColumnSuccess, getCurrentColumn, getCurrentColumnSuccess, loadColumns, loadColumnsSuccess, loadTasks, loadTasksSuccess,
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

  editColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, columnId, column }) => this.apiService
        .editColumn(boardId, columnId, column)
        .pipe(
          map((column) => editColumnSuccess({ columnId, column })),
          catchError(async (err) => err),
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

  getCurrentColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCurrentColumn),
      switchMap(({ boardId, columnId }) => this.apiService
        .getColumnById(boardId, columnId)
        .pipe(
          map((column) => getCurrentColumnSuccess({ column })),
          catchError(() => EMPTY),
        )),
    ),
  );

  loadTasks$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId, columnId }) => this.apiService
        .getAllTasks(boardId, columnId)
        .pipe(
          map((tasks) => loadTasksSuccess({ columnId, tasks })),
          catchError(() => EMPTY),
        )),
    ),
  );
}
