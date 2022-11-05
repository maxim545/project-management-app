import { Injectable } from '@angular/core';
import {
  IUserLogin, IUserRegister, IUserToken, IUser,
} from 'src/app/core/models/user.model';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api/api.service';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { tap, map } from 'rxjs/operators';
import {
  cleanUserStore,
  loadUser, loginUserSuccess, removeUser, saveUser,
} from 'src/app/core/store/actions/user.actions';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) {
    this.isLoggedIn$ = this.getCurrentUser().pipe(
      map((user) => !!user),
    );
  }

  loginUser(user: IUserLogin) {
    this.snackBar.open('Login Success', '', snackBarGreenConfig)
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['main']);
      });
  }

  signUpUser(user: IUserRegister) {
    this.snackBar.open('Register success', '', snackBarGreenConfig);
  }

  logoutUser() {
    localStorage.clear();
    this.store.dispatch(cleanUserStore());
    this.router.navigate(['welcome']);
  }

  getCurrentUser() {
    return this.store.select(getUserStore).pipe(
      map(({ user }) => user),
    );
  }
}
