import { Injectable } from '@angular/core';
import { IUserLogin, IUserRegister, IUserToken } from 'src/app/core/models/user.model';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api/api.service';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { tap, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  /* signUpUser(user: IUserRegister) {
    return this.apiService.signUp(user)
      .subscribe(() => {
        this.snackBar.open('Register success', '', snackBarGreenConfig)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigate(['/auth/login']);
          });
      });
  } */

  /* loginUser(user: IUserLogin) {
    return this.apiService.login(user).subscribe((res) => {
      if (res.body) {
        localStorage.setItem('uniq_token', res.body.token);
        this.snackBar.open('Login Success', '', snackBarGreenConfig)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigate(['main']);
            this.userService.saveCurrentUser(user.login);
          });
      }
    });
  } */

  /* loginUser(user: IUserLogin) {
    return this.apiService.login(user).pipe(
      tap((res) => {
        if (res.body) {
          localStorage.setItem('uniq_token', res.body.token);
          this.router.navigate(['main']);
        }
      }),
    );
  } */

  loginUser(response: IUserToken) {
    localStorage.setItem('uniq_token', response.token);
    this.snackBar.open('Login Success', '', snackBarGreenConfig);
    this.router.navigate(['main']);
  }

  signUpUser(/* user: IUserRegister */) {
    this.snackBar.open('Register success', '', snackBarGreenConfig);
    this.router.navigate(['/auth/login']);
  }
}
