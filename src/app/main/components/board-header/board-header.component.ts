import {
  AfterViewInit, Component, Input, NgModuleFactory, OnDestroy, OnInit,
} from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import {
  Observable, map, skipWhile, take, Subscription,
} from 'rxjs';
import { parseJwt } from 'src/app/core/configs/tokenParse';
import { IBoard, IColumn } from 'src/app/core/models/board.model';
import { IUser } from 'src/app/core/models/user.model';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getUsers } from 'src/app/core/store/selectors/user.selectors';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  /*  @Input() public board: IBoard | null = null; */

  @Input() public columns: IColumn[] | null = null;

  @Input() public boardId!: string;

  @Input() public users!: IUser[] | null;

  public board$: Observable<IBoard | undefined> | null = null;

  public selectedUsers: IUser[] | null = null;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private columnStore: Store<ColumnState>,
    private formBuilder: FormBuilder,
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
          this.selectedUsers = this.users?.filter((a) => board.users.includes(a._id)) || null;
        }
        return board;
      }),
    );
  }

  addUsers(board: IBoard) {
    const currentUserIds = this.selectedUsers?.map((user) => user._id).sort((a, b) => a.localeCompare(b)) as string[];
    const prevUserIds = [...board.users].sort((a, b) => a.localeCompare(b));
    if (currentUserIds.length !== prevUserIds.length && !currentUserIds.every((val, i) => val === prevUserIds[i])) {
      this.boardService.editBoard(board._id, {
        title: board.title,
        owner: board.owner,
        users: currentUserIds,
      });
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
