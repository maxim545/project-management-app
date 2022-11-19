import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.scss'],
})
export class ColumnHeaderComponent implements OnInit {
  @Input() public column: IColumn | null = null;

  public editTitleForm!: FormGroup;

  public isEditMode: boolean = false;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  constructor(
    public dialog: MatDialog,
    private columnsService: ColumnsService,
    private router: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.editTitleForm = new FormGroup({
      title: new FormControl(this.column?.title, [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.editTitleForm.controls;
  }

  editTitle(column: IColumn) {
    if (column.title !== this.editTitleForm.value.title) {
      this.columnsService.editColumn(this.boardId!, {
        ...column,
        title: this.editTitleForm.value.title,
      });
    }
  }

  deleteColumn(column: IColumn) {
    this.dialog.open(ConfirmModalComponent, deleteColumnDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.columnsService.deleteColumn(this.boardId, column._id);
        }
      });
  }
}
