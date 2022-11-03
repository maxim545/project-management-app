import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBoard, IBoardBybId } from 'src/app/core/models/board.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { createColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { loadColumns } from '../../../core/store/actions/columns.actions';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boards$!: Subscription;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  public board: IBoardBybId | null = null;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private boardsService: BoardsService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.boards$ = this.store.select(getCurrentBoards).subscribe((boards) => {
      this.board = boards.find((item) => item.id === this.boardId) || null;
    });
    if (this.boardId) {
      const id = this.boardId;
      this.store.dispatch(loadColumns({ id }));
    }
    /* this.boardsService.getCurrentBoard(this.boardId); */
  }

  ngOnDestroy(): void {
    this.boards$.unsubscribe();
  }

  openColumnCreater() {
    if (this.board) {
      this.dialog.open(ColumnModalComponent, {
        data: {
          message: 'Edit new board',
          buttonText: {
            confirm: 'Edit',
            cancel: 'Close',
          },
          boardId: this.board.id,
        },
      });
    }
  }
}
