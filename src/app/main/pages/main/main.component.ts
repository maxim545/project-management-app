import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$!: Observable<IBoard[]>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private boardService: BoardsService,
    private boardStore: Store<BoardState>,
  ) { }

  ngOnInit(): void {
    this.boards$ = this.boardStore.pipe(select(getAllBoards));
  }

  deleteBoard(board: IBoard) {
    this.dialog.open(ConfirmModalComponent, deleteBoardDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.boardService.deleteBoard(board.id);
        }
      });
  }

  editBoard(board: IBoard) {
    this.dialog.open(BoardModalComponent, {
      data: {
        dialogTitle: 'Edit new board',
        boardId: board.id,
        boardTitle: board.title,
        boardDescr: board.description,
      },
    });
  }
}
