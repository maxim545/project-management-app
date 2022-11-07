import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBoard, IBoardResponse, IColumn } from 'src/app/core/models/board.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { createColumnDialogConfig, deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getCurrentBoard } from 'src/app/core/store/actions/boards.actions';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { loadColumns } from '../../../core/store/actions/columns.actions';
import { BoardsService } from '../../services/boards/boards.service';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public boardId = this.router.snapshot.paramMap.get('id');

  public board$!: Observable<IBoardResponse>;

  public test$!: Observable<IBoardResponse>;

  public columns$!: Observable<IColumn[]>;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private boardsService: BoardsService,
    public dialog: MatDialog,
    private columnsService: ColumnsService,
    private columnStore: Store<ColumnState>,
    private boardStore: Store<BoardState>,
  ) {

  }

  ngOnInit(): void {
    this.board$ = this.boardStore.pipe(
      select(getAllBoards),
      map((boards) => {
        const currentBoard = boards.find((board) => board.id === this.boardId) as IBoardResponse;
        if (!currentBoard) {
          // navigate to 404
          throw new Error('Board id is not valid');
        } else if (this.boardId) {
          this.store.dispatch(loadColumns({ id: this.boardId }));
        }
        return currentBoard;
      }),
    );
    this.columns$ = this.columnStore.pipe(
      select(getAllColumns),
      map((columns) => JSON.parse(JSON.stringify(columns))),
    );
  }
}
