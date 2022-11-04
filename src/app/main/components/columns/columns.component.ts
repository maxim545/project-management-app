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
import { Observable } from 'rxjs';
import { loadColumns } from 'src/app/core/store/actions/columns.actions';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  @Input() public columns$!: Observable<IColumn[]>;

  public editTitleForm!: FormGroup;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  public isEditMode: boolean = false;

  /*   public tasks$!: Observable<ITask[]>; */

  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store,
    private columnsService: ColumnsService,
  ) { }

  ngOnInit(): void {
    /* this.store.dispatch(loadColumns({ id: this.boardId }));
    this.tasks$ = this.store.select(getCurrentColumns); */
  }

  openColumnCreater() {
    this.dialog.open(ColumnModalComponent, {
      data: {
        message: 'Create new column',
        buttonText: {
          confirm: 'Create',
          cancel: 'Close',
        },
        boardId: this.boardId,
      },
    });
  }
}
