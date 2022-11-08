import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IColumn, IColumnPostRequest, IColumnPutRequest, IColumnResponse,
} from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { select, Store } from '@ngrx/store';
import { addColumn, deleteColumn, editColumn } from 'src/app/core/store/actions/columns.actions';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { ColumnState, columnStateSelector } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  isLoadingColums$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private store: Store,
    private columnStore: Store<ColumnState>,
  ) {
    this.isLoadingColums$ = this.store.pipe(
      select(columnStateSelector),
      map((data) => data.loading),
    );
  }

  addColumn(id: string, column: IColumnPostRequest) {
    this.store.dispatch(addColumn({ id, column }));
  }

  editColumn(boardId: string, columnId: string, column: IColumn) {
    this.store.dispatch(editColumn({ boardId, columnId, column }));
  }

  deleteColumn(boardId: string, columnId: string) {
    this.store.dispatch(deleteColumn({ boardId, columnId }));
  }
}
