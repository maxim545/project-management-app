import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBoard, IBoardBybId, IColumn } from 'src/app/core/models/board.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { createColumnDialogConfig, deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getCurrentColumns } from 'src/app/core/store/selectors/columns.selectors';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { loadColumns } from '../../../core/store/actions/columns.actions';
import { BoardsService } from '../../services/boards/boards.service';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boards$!: Subscription;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  public board: IBoardBybId | null = null;

  public columns$!: Observable<IColumn[]>;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private boardsService: BoardsService,
    public dialog: MatDialog,
    private columnsService: ColumnsService,
  ) {

  }

  ngOnInit(): void {
    this.boards$ = this.store.select(getCurrentBoards).subscribe((boards) => {
      this.board = boards.find((item) => item.id === this.boardId) || null;
    });
    if (this.boardId && this.board) {
      this.store.dispatch(loadColumns({ id: this.boardId }));
      this.columns$ = this.store.select(getCurrentColumns);
    } else {
      // navigate to 404
    }
    /* this.boardsService.getCurrentBoard(this.boardId); */
  }

  ngOnDestroy(): void {
    this.boards$.unsubscribe();
  }
}
