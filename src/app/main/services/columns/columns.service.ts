import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn, IColumnPostRequest, IColumnResponse } from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(
    private apiService: ApiService,
  ) { }

  getCurrentColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.apiService.getAllColumns(boardId);
  }

  addColumn(boardId: string, column: IColumnPostRequest) {
    this.apiService.createColumn(boardId, column).subscribe((data) => {
      console.log(data);
    });
  }
}
