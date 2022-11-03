import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  public editTitleForm!: FormGroup;

  @Input() public columns: IColumn[] | null = null;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  public isEditMode: boolean = false;

  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private columnsService: ColumnsService,
  ) { }

  ngOnInit(): void {
    /* this.editTitleForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    }); */
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

  /*  get f() {
    return this.editTitleForm.controls;
  }

  editTitle() {

  }

  deleteColumn(column: IColumn) {
    this.dialog.open(ConfirmModalComponent, deleteColumnDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.columnsService.deleteColumn(this.boardId, column.id);
        }
      });
  } */
}
