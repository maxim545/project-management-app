import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
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
  ) { }

  ngOnInit(): void {
    this.boards$ = this.store.select(getCurrentBoards);
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
        message: 'Edit new board',
        buttonText: {
          confirm: 'Edit',
          cancel: 'Close',
        },
        boardId: board.id,
        boardTitle: board.title,
        boardDescr: board.description,
      },
    });
  }
}
