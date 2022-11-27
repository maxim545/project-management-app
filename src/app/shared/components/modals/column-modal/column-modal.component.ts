import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IColumnDialog } from 'src/app/core/models/modal.model';
import { ColumnsService } from '../../../../main/services/columns/columns.service';

@Component({
  selector: 'app-column-modal',
  templateUrl: './column-modal.component.html',
  styleUrls: ['./column-modal.component.scss'],
})
export class ColumnModalComponent implements OnInit {
  columnForm!: FormGroup;

  dialogTitle: string = '';

  boardId: string | null = null;

  columnsQuantity: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: IColumnDialog,
    private dialogRef: MatDialogRef<ColumnModalComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private columnsService: ColumnsService,
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle;
      this.boardId = data.boardId;
      this.columnsQuantity = data.columnsQuantity;
    }
  }

  ngOnInit(): void {
    this.columnForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
    });
  }

  get f() { return this.columnForm.controls; }

  closeDiadlog(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.boardId && typeof this.columnsQuantity === 'number') {
      this.columnsService.addColumn(this.boardId, {
        title: this.columnForm.value.title,
        order: this.columnsQuantity as number,
      });
      this.dialog.closeAll();
    }
  }
}
