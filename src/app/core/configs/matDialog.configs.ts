import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig,
} from '@angular/material/dialog';

export const dialogProfileConfig = new MatDialogConfig();
dialogProfileConfig.data = {
  dialogTitle: 'Bord.sureDelProfile',
  buttonText: {
    confirm: 'Bord.Yes',
    cancel: 'Bord.No',
  },
};

export const deleteBoardDialogConfig = new MatDialogConfig();
deleteBoardDialogConfig.data = {
  dialogTitle: 'Bord.sureDel',
  buttonText: {
    confirm: 'Bord.Delete',
    cancel: 'Bord.No',
  },
};

export const createBoardDialogConfig = new MatDialogConfig();
createBoardDialogConfig.data = {
  dialogTitle: 'Bord.form__title',
  buttonText: {
    confirm: 'Bord.Create',
    cancel: 'Bord.Close',
  },
};

export const createColumnDialogConfig = new MatDialogConfig();
createColumnDialogConfig.data = {
  dialogTitle: 'Bord.CreateСolumn',
  buttonText: {
    confirm: 'Bord.Create',
    cancel: 'Bord.Close',
  },
};

export const deleteColumnDialogConfig = new MatDialogConfig();
deleteColumnDialogConfig.data = {
  dialogTitle: 'Bord.sureDelColum',
  buttonText: {
    confirm: 'Bord.Delete',
    cancel: 'Bord.No',
  },
};

export const deleteTaskDialogConfig = new MatDialogConfig();
deleteTaskDialogConfig.data = {
  dialogTitle: 'Bord.sureDelTask',
  buttonText: {
    confirm: 'Bord.Delete',
    cancel: 'Bord.No',
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
