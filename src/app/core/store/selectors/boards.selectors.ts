import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {
  BoardState, boardStateSelector, selectAll, selectEntities,
} from '../reducers/boards.reducer';

export const getAllBoards = createSelector(
  boardStateSelector,
  selectAll,
);

export const selectEntity = (id: string) => createSelector(
  selectEntities,
  (entities) => entities[id],
);

export const getBoardLoadingStatus = createSelector(
  boardStateSelector,
  (state: BoardState) => state.isLoading,
);
