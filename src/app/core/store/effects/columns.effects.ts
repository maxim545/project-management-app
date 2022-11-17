import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';
import { IColumn, ITask } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import {
  addColumn, addColumnSuccess, addTask, deleteColumn, deleteColumnSuccess, deleteTask, editColumn, editColumnSuccess, editTask, loadColumns, loadColumnsSuccess, updateColumnsSet, updateColumnsSetSuccess, updateTasksSet, updTasksBetweenColumns,
} from '../actions/columns.actions';

@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  /* -----------COLUMNS----------- */

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
                const newColumns: IColumn[] = [];
                columns.forEach((column) => {
                  const filteredTasks = tasks.filter((task) => task.columnId === column._id);
                  filteredTasks.sort((a, b) => a.order - b.order);
                  newColumns.push({
                    ...column,
                    tasks: filteredTasks,
                  });
                });
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
          map((resColumn) => addColumnSuccess({
            column: {
              ...resColumn,
              tasks: [],
            },
          })),
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
          map(() => editColumnSuccess({ columnId: column._id, column })),
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

  /* -----------TASKS----------- */

  addTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(addTask),
      switchMap(({ column, task }) => this.apiService
        .createTask(column.boardId, column._id, task)
        .pipe(
          map((resTask) => editColumnSuccess({
            columnId: column._id,
            column: {
              ...column,
              tasks: [...column.tasks, resTask],
            },
          })),
          catchError(async (err) => err),
        )),
    ),
  );

  editTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(editTask),
      switchMap(({ column, task }) => this.apiService
        .editTask(task.boardId, task.columnId, task._id, {
          title: task.title,
          order: task.order,
          description: task.description,
          columnId: task.columnId,
          userId: task.userId,
          users: task.users,
        })
        .pipe(
          map(() => {
            const copiedTasks = [...column.tasks];
            copiedTasks[task.order] = task;
            return editColumnSuccess({
              columnId: task.columnId,
              column: {
                ...column,
                tasks: copiedTasks,
              },
            });
          }),
          catchError(async (err) => err),
        )),
    ),
  );

  deleteTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ column, task }) => this.apiService
        .deleteTask(task.boardId, task.columnId, task._id)
        .pipe(
          map(() => editColumnSuccess({
            columnId: column._id,
            column: {
              ...column,
              tasks: column.tasks.filter((item) => item._id !== task._id),
            },
          })),
          catchError(async (err) => err),
        )),
    ),
  );

  updateTasksSet$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateTasksSet),
      switchMap(({ column, tasks }) => this.apiService
        .updateSetTasks(tasks)
        .pipe(
          map((resTasks) => editColumnSuccess({
            columnId: column._id,
            column: {
              ...column,
              tasks: [...resTasks],
            },
          })),
          catchError(async (err) => err),
        )),
    ),
  );

  updTasksBetweenColumns$ = createEffect(
    () => this.actions$.pipe(
      ofType(updTasksBetweenColumns),
      switchMap(({ columns, tasks }) => this.apiService
        .updateSetTasks(tasks)
        .pipe(
          map(() => updateColumnsSetSuccess({ columns })),
          catchError(async (err) => err),
        )),
    ),
  );
}
