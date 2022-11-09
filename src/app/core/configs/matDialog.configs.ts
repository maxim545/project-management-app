import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig,
} from '@angular/material/dialog';

export const dialogProfileConfig = new MatDialogConfig();
dialogProfileConfig.data = {
  dialogTitle: 'Are you sure want to delete your profile?',
  buttonText: {
    confirm: 'Yes',
    cancel: 'No',
  },
};

export const deleteBoardDialogConfig = new MatDialogConfig();
deleteBoardDialogConfig.data = {
  dialogTitle: 're you sure want to delete?',
  buttonText: {
    confirm: 'Delete',
    cancel: 'No',
  },
};

export const createBoardDialogConfig = new MatDialogConfig();
createBoardDialogConfig.data = {
  dialogTitle: 'Create new board',
  buttonText: {
    confirm: 'Create',
    cancel: 'Close',
  },
};

export const createColumnDialogConfig = new MatDialogConfig();
createColumnDialogConfig.data = {
  dialogTitle: 'Create new column',
  buttonText: {
    confirm: 'Create',
    cancel: 'Close',
  },
};

export const deleteColumnDialogConfig = new MatDialogConfig();
deleteColumnDialogConfig.data = {
  dialogTitle: 'Are you sure want to delete column?',
  buttonText: {
    confirm: 'Delete',
    cancel: 'No',
  },
};

export const deleteTaskDialogConfig = new MatDialogConfig();
deleteTaskDialogConfig.data = {
  dialogTitle: 'Are you sure want to delete this task?',
  buttonText: {
    confirm: 'Delete',
    cancel: 'No',
  },
};

/* export const createTaskDialogConfig = new MatDialogConfig();
createTaskDialogConfig.data = {
  dialogTitle: 'Create new task',
  buttonText: {
    confirm: 'Create',
    cancel: 'Close',
  },
}; */

/* export const editBoardDialogConfig = new MatDialogConfig();
editBoardDialogConfig.data = {
  dialogTitle: 'Edit new board',
  buttonText: {
    confirm: 'Edit',
    cancel: 'Close',
  },
}; */
