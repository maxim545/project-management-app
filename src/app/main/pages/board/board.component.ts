import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  catchError, map, skipWhile, take,
} from 'rxjs/operators';
import { IBoard, IColumn } from 'src/app/core/models/board.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { createColumnDialogConfig, deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getAllBoards, selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
import { getUsers } from 'src/app/core/store/selectors/user.selectors';
import { IUser } from 'src/app/core/models/user.model';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { clearColumns, loadColumns } from '../../../core/store/actions/columns.actions';
import { BoardsService } from '../../services/boards/boards.service';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boardId: string = this.actRouter.snapshot.paramMap.get('id') as string;

  public board$!: Observable<IBoard>;

  public columns$!: Observable<IColumn[]>;

  public users$!: Observable<IUser[] | null>;

  constructor(
    private actRouter: ActivatedRoute,
    private store: Store,
    private boardsService: BoardsService,
    public dialog: MatDialog,
    private columnsService: ColumnsService,
    private columnStore: Store<ColumnState>,
    private boardStore: Store<BoardState>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    /* this.store.dispatch(loadBoards()); */
  }

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
    this.board$ = this.boardStore.pipe(
      select(boardStateSelector),
      skipWhile((flag) => !flag.isLoggedIn),
      take(1),
      select(selectEntity(this.boardId)),
      map((board) => {
        if (board) {
          this.store.dispatch(loadColumns({ id: this.boardId }));
          return board;
        }
        this.router.navigate(['**']);
        throw new Error('Board id is not valid');
      }),
    );
    this.columns$ = this.columnStore.pipe(
      select(getAllColumns),
      map((columns) => JSON.parse(JSON.stringify(columns))),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(clearColumns());
  }
}
