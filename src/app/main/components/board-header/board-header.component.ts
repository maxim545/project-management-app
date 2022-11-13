import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard, IColumn } from 'src/app/core/models/board.model';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  @Input() public board: IBoard | null = null;

  @Input() public columns: IColumn[] | null = null;

  /*   @Input() public columns$: Observable<IColumn[]> | null = null; */

  constructor(
    public dialog: MatDialog,
    private columnStore: Store<ColumnState>,
  ) { }

  ngOnInit(): void {
    /* this.columns$ = this.columnStore.pipe(select(getAllColumns)); */
  }

  openColumnCreater(columnsQuantity: number | undefined) {
    if (this.board) {
      this.dialog.open(ColumnModalComponent, {
        data: {
          dialogTitle: 'Create new column',
          boardId: this.board._id,
          columnsQuantity,
        },
      });
    }
  }
}
