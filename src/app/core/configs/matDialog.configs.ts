import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig,
} from '@angular/material/dialog';

export const dialogProfileConfig = new MatDialogConfig();
dialogProfileConfig.data = {
  message: 'Are you sure want to delete your profile?',
  buttonText: {
    confirm: 'Yes',
    cancel: 'No',
  },
};

export const dialogBoardConfig = new MatDialogConfig();
dialogBoardConfig.data = {
  message: 're you sure want to delete?',
  buttonText: {
    confirm: 'Delete',
    cancel: 'No',
  },
};
