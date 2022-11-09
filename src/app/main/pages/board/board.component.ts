import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, skipWhile } from 'rxjs/operators';
import { IBoard, IBoardResponse, IColumn } from 'src/app/core/models/board.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { createColumnDialogConfig, deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getCurrentBoard } from 'src/app/core/store/actions/boards.actions';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
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
  public boardId: string | null = this.actRouter.snapshot.paramMap.get('id');

  public board$!: Observable<IBoardResponse>;

  public test$!: Observable<IBoardResponse>;

  public columns$!: Observable<IColumn[]>;

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

  }

  ngOnInit(): void {
    this.board$ = this.boardStore.pipe(
      select(boardStateSelector),
      skipWhile((flag) => flag.isLoading),
      map((boards) => {
        if (this.boardId && boards.entities[this.boardId]) {
          this.store.dispatch(loadColumns({ id: this.boardId }));
          return boards.entities[this.boardId] as IBoardResponse;
        }
        this.snackBar.open('This board do not exist in app', '', snackBarRedConfig);
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
