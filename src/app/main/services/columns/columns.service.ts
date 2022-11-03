import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn, IColumnPostRequest, IColumnResponse } from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Store } from '@ngrx/store';
import { addColumn } from 'src/app/core/store/actions/columns.actions';

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

  addColumn(id: string, column: IColumnPostRequest) {
    this.store.dispatch(addColumn({ id, column }));
    /* this.apiService.createColumn(boardId, column).subscribe((data) => {
      console.log(data);
    }); */
  }
}
