import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBoardResponse } from 'src/app/core/models/board.model';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  @Input() public board: IBoardResponse | null = null;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openColumnCreater() {
    this.dialog.open(ColumnModalComponent, {
      data: {
        dialogTitle: 'Create new column',
        boardId: this.board?._id,
      },
    });
  }
}
