import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IColumn, IColumnPostRequest, IColumnPutRequest, IColumnResponse,
} from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Store } from '@ngrx/store';
import { addColumn, deleteColumn, editColumn } from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(
    private apiService: ApiService,
    private store: Store,
  ) { }

  /* getCurrentColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.apiService.getAllColumns(boardId);
  } */

  addColumn(boardId: string, column: IColumnPostRequest) {
    this.store.dispatch(addColumn({ boardId, column }));
  }

  editColumn(boardId: string, columnId: string, column: IColumnPutRequest) {
    this.store.dispatch(editColumn({ boardId, columnId, column }));
  }

  deleteColumn(boardId: string, columnId: string) {
    this.store.dispatch(deleteColumn({ boardId, columnId }));
  }
}
