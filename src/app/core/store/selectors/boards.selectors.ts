import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { boardStateSelector, selectAll, selectEntities } from '../reducers/boards.reducer';

export const getAllBoards = createSelector(
  boardStateSelector,
  selectAll,
);

/* export const selectEntity = (id: string) => createSelector(
  selectEntities,
  (entities) => prsnlsState.entities[id]
);
 */
