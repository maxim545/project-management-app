import { createAction, props } from '@ngrx/store';
import { IPoint, IPointCreateRequest, ITaskRequest } from '../../models/board.model';

export const loadPoints = createAction(
  '[Points] Load Points',
  props<{ userId: string }>(),
);

export const loadPointsSuccess = createAction(
  '[Points] Load Points Success',
  props<{ points: IPoint[] }>(),
);

export const addPoint = createAction(
  '[Points] Add Columns',
  props<{ point: IPointCreateRequest }>(),
);

export const addPointSuccess = createAction(
  '[Points] Add Columns Success',
  props<{ point: IPoint }>(),
);

export const editPoint = createAction(
  '[Points] Edit Point',
  props<{ point: IPoint }>(),
);

export const editPointSuccess = createAction(
  '[Points] Edit Point Success',
  props<{ point: IPoint }>(),
);

export const deletePoint = createAction(
  '[Points] Delete Column',
  props<{ pointId: string, }>(),
);

export const deletePointSuccess = createAction(
  '[Points] Delete Column Success',
  props<{ pointId: string }>(),
);

export const pointFailed = createAction(
  '[Points] Points Failed',
  props<{ error: string }>(),
);
