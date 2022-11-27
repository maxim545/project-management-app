import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IColumn, IColumnRequest, IColumnResponse, IColumnSet,
} from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { select, Store } from '@ngrx/store';
import {
  addColumn, deleteColumn, editColumn, updateColumnsSet,
} from 'src/app/core/store/actions/columns.actions';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { ColumnState, columnStateSelector } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns, getColumnLoadingStatus } from 'src/app/core/store/selectors/columns.selectors';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  isLoadingColums$: Observable<boolean>;

  constructor(
    private store: Store,
  ) {
    this.isLoadingColums$ = this.store.pipe(select(getColumnLoadingStatus));
  }

  addColumn(id: string, column: IColumnRequest) {
    this.store.dispatch(addColumn({ id, column }));
  }

  editColumn(boardId: string, column: IColumn) {
    this.store.dispatch(editColumn({ boardId, column }));
  }

  editSetColumns(columns: IColumn[]) {
    const updatedColumns: IColumnSet[] = [];
    columns.forEach((column, i) => {
      updatedColumns.push({
        _id: column._id,
        order: i,
      });
    });
    this.store.dispatch(updateColumnsSet({ columns: updatedColumns }));
  }

  deleteColumn(boardId: string, columnId: string) {
    this.store.dispatch(deleteColumn({ boardId, columnId }));
  }
}
