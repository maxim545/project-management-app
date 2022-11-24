import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';
import { IColumn, ITask } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import { updateColumnsSetSuccess } from '../actions/columns.actions';
import {
  addTask,
  addTasksSuccess,
  deleteTask,
  deleteTasksSuccess,
  editTask,
  editTasksSuccess,
  loadTasks, loadTasksSuccess, updateTasksOrder, updateTasksOrderSuccess,
} from '../actions/tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadTasks$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ id }) => this.apiService
        .getTasksSetByUserId(id)
        .pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError(async (err) => err),
        )),
    ),
  );

  addTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(addTask),
      switchMap(({ column, task }) => this.apiService
        .createTask(column.boardId, column._id, task)
        .pipe(
          map((resTask) => addTasksSuccess({ task: resTask })),
          catchError(async (err) => err),
        )),
    ),
  );

  editTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(editTask),
      switchMap(({ task }) => this.apiService
        .editTask(task.boardId, task.columnId, task._id, {
          title: task.title,
          order: task.order,
          description: task.description,
          columnId: task.columnId,
          userId: task.userId,
          users: task.users,
        })
        .pipe(
          map((resTask) => editTasksSuccess({ task: resTask })),
          catchError(async (err) => err),
        )),
    ),
  );

  updateTasksOrder$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateTasksOrder),
      switchMap(({ tasks }) => this.apiService
        .updateSetTasks(tasks)
        .pipe(
          map((resTasks) => updateTasksOrderSuccess({ tasks: resTasks })),
          catchError(async (err) => err),
        )),
    ),
  );

  deleteTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ task }) => this.apiService
        .deleteTask(task.boardId, task.columnId, task._id)
        .pipe(
          map(() => deleteTasksSuccess({ taskId: task._id })),
          catchError(async (err) => err),
        )),
    ),
  );
}
