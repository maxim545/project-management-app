import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap,
} from 'rxjs';

import { ApiService } from '../../services/api/api.service';
import {
  addFile, addFileSuccess, deleteFile, deleteFileSuccess, loadFiles, loadFilesSuccess,
} from '../actions/files.actions';

@Injectable()
export class FilesEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadFiles$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadFiles),
      switchMap(({ userId }) => this.apiService
        .getFilesByUserId(userId)
        .pipe(
          map((files) => loadFilesSuccess({ files })),
          catchError(async (err) => err),
        )),
    ),
  );

  addFile$ = createEffect(
    () => this.actions$.pipe(
      ofType(addFile),
      switchMap(({ file }) => this.apiService
        .uploadFile(file)
        .pipe(
          map((resFile) => addFileSuccess({ file: resFile })),
          catchError(async (err) => err),
        )),
    ),
  );

  deleteFile$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteFile),
      switchMap(({ fileId }) => this.apiService
        .deleteFile(fileId)
        .pipe(
          map(() => deleteFileSuccess({ fileId })),
          catchError(async (err) => err),
        )),
    ),
  );
}
