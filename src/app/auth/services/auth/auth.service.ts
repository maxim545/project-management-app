import { Injectable } from '@angular/core';
import { IUserLogin, IUserRegister } from 'src/app/core/models/user.model';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api/api.service';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  signUpUser(currentUser: IUserRegister) {

  }

  loginUser(currentUser: IUserLogin) {
    return this.apiService.login(currentUser).subscribe((res) => {
      if (res.body) {
        localStorage.setItem('uniq_token', res.body.token);
        this.snackBar.open('Login Success', '', snackBarGreenConfig)
          .afterDismissed().subscribe(() => {

          });
      }
    });
  }
}
