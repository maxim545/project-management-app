import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarRedConfig } from '../../configs/snackBar.configs';
import { LangService } from '../lang/lang.service';
import { trnsttValues } from '../../configs/lang';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private langService: LangService,
  ) { }

  handler(err: HttpErrorResponse, url: string = '') {
    const curLng = this.langService.getCurrentLanguage();
    switch (err.status) {
      case 403:
        this.authService.logoutUser();
        this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].user.token, '', snackBarRedConfig);
        break;

      case 409:
      case 500:
        this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].user.userExist, '', snackBarRedConfig);
        break;

      case 401:
        this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].user.inCorrect, '', snackBarRedConfig);
        break;

      default:
        this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].user.wrong, '', snackBarRedConfig);
    }
  }
}
