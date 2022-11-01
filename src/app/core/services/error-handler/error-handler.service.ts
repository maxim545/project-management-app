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

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  handler(err: HttpErrorResponse, url: string = '') {
    switch (err.status) {
      case HttpStatusCode.Unauthorized:
        this.authService.logoutUser();
        break;

      case 409: case 500:
        this.snackBar.open('User with this login already exists', '', snackBarRedConfig);
        break;

      case 403:
        this.snackBar.open('Your login or password is incorrect', '', snackBarRedConfig);
        break;

      default:
        this.snackBar.open('Sothng go wrong', '', snackBarRedConfig);
    }
  }
}
