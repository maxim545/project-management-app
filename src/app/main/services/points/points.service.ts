import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addPoint, deletePoint, editPoint } from 'src/app/core/store/actions/points.actions';
import { getPointsLoadingStatus } from 'src/app/core/store/selectors/points.selectors';
import { IPoint, IPointCreateRequest } from '../../../core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  isLoadingPoint$: Observable<boolean>;

  constructor(
    private store: Store,
  ) {
    this.isLoadingPoint$ = this.store.pipe(select(getPointsLoadingStatus));
  }

  addPoint(point: IPointCreateRequest) {
    this.store.dispatch(addPoint({ point }));
  }

  editPoint(point: IPoint) {
    this.store.dispatch(editPoint({ point }));
  }

  deletePoint(pointId: string) {
    this.store.dispatch(deletePoint({ pointId }));
  }
}
