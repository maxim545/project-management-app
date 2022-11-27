import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { FileState, fileStateSelector, selectAll } from '../reducers/files.reducers';

export const getAllFiles = createSelector(
  fileStateSelector,
  selectAll,
);

export const getFilesLoadingStatus = createSelector(
  fileStateSelector,
  (state: FileState) => state.isLoading,
);
