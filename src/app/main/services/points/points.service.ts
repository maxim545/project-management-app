import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPoint, deletePoint, editPoint } from 'src/app/core/store/actions/points.actions';
import { IPoint, IPointCreateRequest } from '../../../core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  constructor(
    private store: Store,
  ) { }

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
