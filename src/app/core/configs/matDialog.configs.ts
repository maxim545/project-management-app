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

export const deleteBoardDialogConfig = new MatDialogConfig();
deleteBoardDialogConfig.data = {
  message: 're you sure want to delete?',
  buttonText: {
    confirm: 'Delete',
    cancel: 'No',
  },
};

export const createBoardDialogConfig = new MatDialogConfig();
createBoardDialogConfig.data = {
  message: 'Create new board',
  buttonText: {
    confirm: 'Create',
    cancel: 'Close',
  },
};

/* export const editBoardDialogConfig = new MatDialogConfig();
editBoardDialogConfig.data = {
  message: 'Edit new board',
  buttonText: {
    confirm: 'Edit',
    cancel: 'Close',
  },
}; */
