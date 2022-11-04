import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck,
} from 'rxjs';
import { IBoard } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import {
  addBoard, addBoardSuccess, addColumn, addTask, deleteBoard, deleteBoardSuccess, deleteColumn, deleteTask, editBoard, editBoardSuccess, editColumn, editTask, getCurrentBoard, getCurrentBoardSuccess, loadBoards, loadBoardsSuccess,
} from '../actions/boards.actions';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadBoards$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() => this.apiService
        .getAllBoards()
        .pipe(
          map((boards) => loadBoardsSuccess({ boards })),
          catchError(() => EMPTY),
        )),
    ),
  );

  addBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(addBoard),
      switchMap(({ board }) => this.apiService
        .createBoard(board)
        .pipe(
          map((board) => addBoardSuccess({ board: (board.body) as IBoard })),
          catchError(() => EMPTY),
        )),
    ),
  );

  getCurrentBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCurrentBoard),
      switchMap(({ id }) => this.apiService
        .getBoardById(id)
        .pipe(
          map((board) => getCurrentBoardSuccess({ board })),
          catchError(() => EMPTY),
        )),
    ),
  );

  editBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(editBoard),
      switchMap(({ board }) => this.apiService
        .editBoard(board.id, {
          title: board.title,
          description: board.description,
        })
        .pipe(
          map((board) => editBoardSuccess({ board: (board.body) as IBoard })),
          catchError(() => EMPTY),
        )),
    ),
  );

  deleteBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteBoard),
      switchMap(({ id }) => this.apiService
        .deleteBoard(id)
        .pipe(
          map(() => deleteBoardSuccess({ id })),
          catchError(async (err) => err),
        )),
    ),
  );

  // COLUMNS

  deleteColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteColumn),
      switchMap(({ boardId, columnId }) => this.apiService
        .deleteColumn(boardId, columnId)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  addColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(addColumn),
      switchMap(({ boardId, column }) => this.apiService
        .createColumn(boardId, column)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  editColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, columnId, column }) => this.apiService
        .editColumn(boardId, columnId, column)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  // TASKS

  addTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(addTask),
      switchMap(({ boardId, columnId, task }) => this.apiService
        .createTask(boardId, columnId, task)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
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
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );

  deleteTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ boardId, columnId, taskId }) => this.apiService
        .deleteTask(boardId, columnId, taskId)
        .pipe(
          switchMap(() => this.apiService
            .getBoardById(boardId).pipe(
              map((board) => getCurrentBoardSuccess({ board })),
              catchError(() => EMPTY),
            )),
        )),
    ),
  );
}
