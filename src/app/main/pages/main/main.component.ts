import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  map, Observable, skipWhile, take,
} from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { parseJwt } from 'src/app/core/configs/tokenParse';
import { IUser } from 'src/app/core/models/user.model';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$: Observable<IBoard[]> = this.boardStore.pipe(select(getAllBoards));

  /* public user$: Observable<IUser | null>; */

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private boardService: BoardsService,
    private boardStore: Store<BoardState>,
  ) {
    /* this.user$ = this.store.select(getUserStore).pipe(
      skipWhile((flag) => !flag.isLoggedIn),
      take(1),
      map(({ user }) => {
        if (user) {
          this.store.dispatch(loadBoards({ userId: user._id }));
          return user;
        }
        return null;
      }),
    ); */
  }

  ngOnInit(): void {

  }

  deleteBoard(board: IBoard) {
    this.dialog.open(ConfirmModalComponent, deleteBoardDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.boardService.deleteBoard(board._id);
        }
      });
  }

  editBoard(board: IBoard) {
    this.dialog.open(BoardModalComponent, {
      data: {
        dialogTitle: 'headerBord.EditDord',
        board,
      },
    });
  }
}
