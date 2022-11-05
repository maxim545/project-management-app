import { Component, Input, OnInit } from '@angular/core';
import { IBoardBybId, IColumn, ITask } from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { Store } from '@ngrx/store';
import {
  map, switchMap, Observable, finalize,
} from 'rxjs';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  @Input() public columns!: IColumn[] | null;

  @Input() public columns$!: Observable<IColumn[]>;

  /*  public tasks$!: Observable<ITask[] | undefined>; */

  public editTitleForm!: FormGroup;

  public boardId = this.router.snapshot.paramMap.get('id') as string;

  public isEditMode: boolean = false;

  /*   public tasks$!: Observable<ITask[]>; */

  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store,
    private columnsService: ColumnsService,
  ) { }

  ngOnInit(): void {
    /* this.columns$ = this.store
      .select(getCurrentBoards)
      .pipe(
        map((boards) => {
          const currentBoard = boards.find((board) => board.id === this.boardId) as IBoardBybId;
          return currentBoard.columns as IColumn[];
        }),
      ); */
    /* this.store.dispatch(loadColumns({ id: this.boardId }));
    this.tasks$ = this.store.select(getCurrentColumns); */
  }

  drop(event: CdkDragDrop<string[]>, columns: IColumn[] | null): void {
    if (columns && event.previousIndex !== event.currentIndex) {
      const copyColumns = JSON.parse(JSON.stringify(columns));
      this.columnsService.editColumn(
        this.boardId,
        copyColumns[event.previousIndex].id,
        {
          title: copyColumns[event.previousIndex].title,
          order: copyColumns[event.currentIndex].order,
        },
      );
      /* this.columnsService.editColumn(
        this.boardId,
        copyColumns[event.currentIndex].id,
        {
          title: copyColumns[event.currentIndex].title,
          order: copyColumns[event.previousIndex].order,
        },
      ); */
    }
  }

  openColumnCreater() {
    this.dialog.open(ColumnModalComponent, {
      data: {
        dialogTitle: 'Create new column',
        boardId: this.boardId,
      },
    });
  }
}
