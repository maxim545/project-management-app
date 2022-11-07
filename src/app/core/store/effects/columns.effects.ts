import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';
import { IColumn } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import {
  addColumn, addColumnSuccess, addTask, deleteColumn, deleteColumnSuccess, deleteTask, editColumn, editColumnSuccess, editTask, loadColumns, loadColumnsSuccess,
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
        .getBoardById(id)
        .pipe(
          map((board) => {
            const columns = board.columns as IColumn[];
            columns.forEach((column) => column.tasks?.sort((a, b) => a.order - b.order));
            return loadColumnsSuccess({ columns });
          }),
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

  editColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, columnId, column }) => this.apiService
        .editColumn(boardId, columnId, {
          title: column.title,
          order: column.order,
        })
        .pipe(
          map((resColumn) => editColumnSuccess({
            columnId,
            column: {
              ...resColumn,
              tasks: column.tasks,
            },
          })),
          catchError(async (err) => err),
        )),
    ),
  );

  addTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(addTask),
      switchMap(({
        boardId, columnId, task,
      }) => this.apiService
        .createTask(boardId, columnId, task)
        .pipe(
          switchMap(() => this.apiService
            .getColumnById(boardId, columnId)
            .pipe(
              map((column) => {
                column.tasks?.sort((a, b) => a.order - b.order);
                return editColumnSuccess({ columnId, column });
              }),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  deleteTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({
        boardId, columnId, taskId,
      }) => this.apiService
        .deleteTask(boardId, columnId, taskId)
        .pipe(
          switchMap(() => this.apiService
            .getColumnById(boardId, columnId)
            .pipe(
              map((column) => {
                column.tasks?.sort((a, b) => a.order - b.order);
                return editColumnSuccess({ columnId, column });
              }),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  editTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(editTask),
      switchMap(({
        boardId, columnId, taskId, task,
      }) => this.apiService
        .editTask(boardId, columnId, taskId, task)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId)
            .pipe(
              map((board) => {
                const columns = board.columns as IColumn[];
                columns.forEach((column) => column.tasks?.sort((a, b) => a.order - b.order));
                return loadColumnsSuccess({ columns });
              }),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );
}
