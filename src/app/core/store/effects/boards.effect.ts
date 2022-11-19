import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck,
} from 'rxjs';
import { IBoard } from '../../models/board.model';
import { ApiService } from '../../services/api/api.service';
import {
  addBoard, addBoardSuccess, boardFailed, deleteBoard, deleteBoardSuccess, editBoard, editBoardSuccess, loadBoards, loadBoardsSuccess,
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
      switchMap(({ userId }) => this.apiService
        .getAllBoards()
        .pipe(
          map((boards) => {
            const filteredBoards = boards.filter((board) => board.owner === userId || board.users.includes(userId));
            return loadBoardsSuccess({ boards: filteredBoards });
          }),
          catchError((error) => of(boardFailed({ error }))),
        )),
    ),
  );

  addBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(addBoard),
      switchMap(({ board }) => this.apiService
        .createBoard(board)
        .pipe(
          map((board) => addBoardSuccess({ board })),
          catchError(async (err) => err),
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

  editBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(editBoard),
      switchMap(({ id, board }) => this.apiService
        .editBoard(id, board)
        .pipe(
          map((resBoard) => editBoardSuccess({
            id: resBoard._id,
            board: resBoard,
          })),
          catchError(async (err) => err),
        )),
    ),
  );

  /* getCurrentBoard$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCurrentBoard),
      switchMap(({ id }) => this.apiService
        .getBoardById(id)
        .pipe(
          map((board) => getCurrentBoardSuccess({ board })),
          catchError(() => EMPTY),
        )),
    ),
  ); */

  /*

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
    ); */
}
