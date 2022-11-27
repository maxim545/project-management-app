import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap, tap, from, EMPTY, pluck, take, debounceTime,
} from 'rxjs';

import { ApiService } from '../../services/api/api.service';
import {
  addPoint, addPointSuccess, deletePoint, deletePointSuccess, editPoint, editPointSuccess, loadPoints, loadPointsSuccess,
} from '../actions/points.actions';

@Injectable()
export class PointsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadPoints$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPoints),
      switchMap(({ userId }) => this.apiService
        .getPointsByUserId(userId)
        .pipe(
          map((points) => loadPointsSuccess({ points })),
          catchError(async (err) => err),
        )),
    ),
  );

  addPoint$ = createEffect(
    () => this.actions$.pipe(
      ofType(addPoint),
      switchMap(({ point }) => this.apiService
        .createPoint(point)
        .pipe(
          map((resPoint) => addPointSuccess({ point: resPoint })),
          catchError(async (err) => err),
        )),
    ),
  );

  editPoint$ = createEffect(
    () => this.actions$.pipe(
      ofType(editPoint),
      switchMap(({ point }) => this.apiService
        .editPoint(point._id, {
          title: point.title,
          done: point.done,
        })
        .pipe(
          map((resPoint) => editPointSuccess({ point: resPoint })),
          catchError(async (err) => err),
        )),
    ),
  );

  deletePoint$ = createEffect(
    () => this.actions$.pipe(
      ofType(deletePoint),
      switchMap(({ pointId }) => this.apiService
        .deletePoint(pointId)
        .pipe(
          map(() => deletePointSuccess({ pointId })),
          catchError(async (err) => err),
        )),
    ),
  );
}
