import {
  AfterViewInit, Component, Input, NgModuleFactory, OnDestroy, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import {
  Observable, map, skipWhile, take, Subscription,
} from 'rxjs';
import { parseJwt } from 'src/app/core/utils/tokenParse';
import { IBoard, IColumn } from 'src/app/core/models/board.model';
import { IUser } from 'src/app/core/models/user.model';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  @Input() columns: IColumn[] | null = null;

  @Input() boardId: string = '';

  @Input() users!: IUser[] | null;

  board$: Observable<IBoard | undefined> | null = null;

  selectedUsers: IUser[] | null = null;

  constructor(
    private dialog: MatDialog,
    private boardService: BoardsService,
    private boardStore: Store<BoardState>,
  ) {
  }

  ngOnInit(): void {
    this.board$ = this.boardStore.pipe(
      select(boardStateSelector),
      skipWhile((flag) => !flag.isLoggedIn),
      select(selectEntity(this.boardId)),
      map((board) => {
        if (board) {
          this.users = this.users?.filter((user) => user._id !== board.owner) || null;
          this.selectedUsers = this.users?.filter((user) => board.users.includes(user._id)) || null;
          this.boardService.setSelectedUsers(this.selectedUsers);
        }
        return board;
      }),
    );
  }

  addUsers(board: IBoard) {
    const currentUserIds = this.selectedUsers?.map((user) => user._id).sort((a, b) => a.localeCompare(b)) as string[];
    const prevUserIds = [...board.users].sort((a, b) => a.localeCompare(b));
    if (currentUserIds.length !== prevUserIds.length) {
      this.boardService.editBoard(board._id, {
        title: board.title,
        owner: board.owner,
        users: currentUserIds,
      });
      if (this.selectedUsers) {
        this.boardService.setSelectedUsers(this.selectedUsers);
      }
    }
  }

  openColumnCreater(board: IBoard, columnsQuantity: number) {
    this.dialog.open(ColumnModalComponent, {
      data: {
        dialogTitle: 'headerBord.createCol',
        boardId: board._id,
        columnsQuantity,
      },
    });
  }

  openBoardEditor(board: IBoard) {
    this.dialog.open(BoardModalComponent, {
      data: {
        dialogTitle: 'headerBord.EditDord',
        board,
      },
    });
  }
}
