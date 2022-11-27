import { createAction, props } from '@ngrx/store';
import { IFile, IFileRequest } from '../../models/board.model';

export const loadFiles = createAction(
  '[Files] Load Files',
  props<{ userId: string }>(),
);

export const loadFilesSuccess = createAction(
  '[Files] Load Files Success',
  props<{ files: IFile[] }>(),
);

export const addFile = createAction(
  '[Files] Add File',
  props<{ file: FormData }>(),
);

export const addFileSuccess = createAction(
  '[Files] Add File Success',
  props<{ file: IFile }>(),
);

export const deleteFile = createAction(
  '[Files] Delete File',
  props<{ fileId: string, }>(),
);

export const deleteFileSuccess = createAction(
  '[Files] Delete File Success',
  props<{ fileId: string }>(),
);

export const fileFailed = createAction(
  '[Files] Files Failed',
  props<{ error: string }>(),
);
