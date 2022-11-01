import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const snackBarGreenConfig = new MatSnackBarConfig();
snackBarGreenConfig.duration = 2000;
snackBarGreenConfig.panelClass = ['alert_green'];

export const snackBarRedConfig = new MatSnackBarConfig();
snackBarRedConfig.duration = 2000;
snackBarRedConfig.panelClass = ['alert_red'];
