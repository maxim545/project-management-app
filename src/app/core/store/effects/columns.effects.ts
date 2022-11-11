import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';
import { IColumn, ITask } from '../../models/board.model';
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

  /*  loadColumns$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadColumns),
      switchMap(({ id }) => this.apiService
        .getAllColumns(id)
        .pipe(
          map((columns) => {
            const test = columns;
            columns.forEach((column) => column.tasks?.sort((a, b) => a.order - b.order));
            return loadColumnsSuccess({ columns });
          }),
          catchError(() => EMPTY),
        )),
    ),
  ); */

  loadColumns$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadColumns),
      switchMap(({ id }) => this.apiService
        .getAllColumns(id)
        .pipe(
          switchMap((columns) => this.apiService
            .getTasksSet(id)
            .pipe(
              map((tasks) => {
                const newColumns = [] as IColumn[];
                columns.forEach((column) => {
                  const newTasks = [] as ITask[];
                  const currentTasks = tasks.forEach((task) => {
                    if (task.columnId === column._id) {
                      newTasks.push(task);
                    }
                  });
                  const newColumn = {
                    ...column,
                    tasks: newTasks,
                  };
                  newColumns.push(newColumn);
                });
                newColumns.forEach((column) => column.tasks?.sort((a, b) => a.order - b.order));
                return loadColumnsSuccess({ columns: newColumns });
              }),
              catchError(() => EMPTY),
            )),
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
              switchMap((column) => this.apiService.getAllTasks(boardId, columnId)
                .pipe(
                  map((tasks) => {
                    const newColumn = {
                      ...column,
                      tasks: tasks.sort((a, b) => a.order - b.order),
                    };
                    return editColumnSuccess({ columnId, column: newColumn });
                  }),
                  catchError(() => EMPTY),
                )),
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
            .getColumnById(boardId, columnId)
            .pipe(
              switchMap((column) => this.apiService.getAllTasks(boardId, columnId)
                .pipe(
                  map((tasks) => {
                    const newColumn = {
                      ...column,
                      tasks: tasks.sort((a, b) => a.order - b.order),
                    };
                    return editColumnSuccess({ columnId, column: newColumn });
                  }),
                  catchError(() => EMPTY),
                )),
            )),
        )),
    ),
  );

  /*

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

       */
}
