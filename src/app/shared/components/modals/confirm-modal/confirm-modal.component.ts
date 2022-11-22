import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmDialog } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  dialogTitle: string = 'Bord.sure';

  confirmButtonText = 'Bord.Yes';

  cancelButtonText = 'Bord.Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: IConfirmDialog,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle;
      this.confirmButtonText = data.buttonText.confirm;
      this.cancelButtonText = data.buttonText.cancel;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onConfirmClick1(): void {
    this.dialogRef.close(false);
  }
}
