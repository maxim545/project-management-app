import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFile } from '../../models/board.model';
import {
  addFile, addFileSuccess, deleteFile, deleteFileSuccess, loadFiles, loadFilesSuccess,
} from '../actions/files.actions';

export interface FileState extends EntityState<IFile> {
  error: string | null;
  isLoading: boolean,
}

export const adapter: EntityAdapter<IFile> = createEntityAdapter<IFile>({
  selectId: (file) => file._id,
  sortComparer: false,
});

export const initialState: FileState = adapter.getInitialState({
  error: null,
  isLoading: false,
});

export const fileReducer = createReducer(
  initialState,

  on(loadFiles, (state) => ({ ...state, isLoading: true })),

  on(loadFilesSuccess, (state, actions) => adapter.setAll(actions.files, { ...state, isLoading: false })),

  on(addFile, (state) => ({ ...state, isLoading: true })),

  on(addFileSuccess, (state, action) => adapter.addOne(action.file, { ...state, isLoading: false })),

  on(deleteFile, (state) => ({ ...state, isLoading: true })),

  on(deleteFileSuccess, (state, action) => adapter.removeOne(action.fileId, { ...state, isLoading: false })),

);

export const fileStateSelector = createFeatureSelector<FileState>('files');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
