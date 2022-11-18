import {
  createFeatureSelector, createReducer, createSelector, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPoint } from '../../models/board.model';
import {
  addPoint,
  addPointSuccess, deletePoint, deletePointSuccess, editPoint, editPointSuccess, loadPoints, loadPointsSuccess,
} from '../actions/points.actions';

export interface PointState extends EntityState<IPoint> {
  error: string | null;
  isLoading: boolean,
}

export const adapter: EntityAdapter<IPoint> = createEntityAdapter<IPoint>({
  selectId: (point) => point._id,
  sortComparer: false,
});

export const initialState: PointState = adapter.getInitialState({
  error: null,
  isLoading: false,
});

export const pointReducer = createReducer(
  initialState,

  on(loadPoints, (state) => ({ ...state, isLoading: true })),

  on(loadPointsSuccess, (state, actions) => adapter.setAll(actions.points, {
    ...state,
    isLoading: false,
  })),

  on(addPoint, (state) => ({ ...state, isLoading: true })),

  on(addPointSuccess, (state, action) => adapter.addOne(action.point, state)),

  on(editPoint, (state) => ({ ...state, isLoading: true })),

  on(editPointSuccess, (state, action) => adapter.updateOne(
    {
      id: action.point._id,
      changes: action.point,
    },
    {
      ...state,
      isLoading: false,
    },
  )),

  on(deletePoint, (state) => ({ ...state, isLoading: true })),

  on(deletePointSuccess, (state, action) => adapter.removeOne(action.pointId, state)),
  /*
    on(clearColumns, (state) => adapter.removeAll(state)),

    on(columnFailed, (state, action) => (
      {
        ...state,
        error: action.error,
        isLoading: false,
      }
    )), */
);

export const pointStateSelector = createFeatureSelector<PointState>('points');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
