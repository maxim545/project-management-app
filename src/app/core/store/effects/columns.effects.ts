import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';
import { IColumn, ITask } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import {
  addColumn, addColumnSuccess, deleteColumn, deleteColumnSuccess, editColumn, editColumnSuccess, loadColumns, loadColumnsSuccess, updateColumnsSet, updateColumnsSetSuccess,
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
          catchError(async (err) => err),
        )),
    ),
  );

  updateColumnsSet$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateColumnsSet),
      switchMap(({ columns }) => this.apiService
        .updateSetColumns(columns)
        .pipe(
          map((resColumns) => updateColumnsSetSuccess({ columns: resColumns })),
          catchError(async (err) => err),
        )),
    ),
  );

  addColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(addColumn),
      switchMap(({ id, column }) => this.apiService
        .createColumn(id, column)
        .pipe(
          map((resColumn) => addColumnSuccess({ column: resColumn })),
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

  editColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, column }) => this.apiService
        .editColumn(boardId, column._id, {
          title: column.title,
          order: column.order,
        })
        .pipe(
          map(() => editColumnSuccess({ column })),
          catchError(async (err) => err),
        )),
    ),
  );
}
