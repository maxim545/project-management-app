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
  loadUser, loginUserSuccess, removeUserStore, saveUser,
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

  loginUser(response: IUserToken, user: IUserLogin) {
    localStorage.setItem('uniq_token', response.token);
    if (!localStorage.getItem('uniq_userId')) {
      this.store.dispatch(saveUser({ user }));
    }
    this.snackBar.open('Login Success', '', snackBarGreenConfig);
    this.router.navigate(['main']);
  }

  signUpUser(user: IUserRegister, userId: string) {
    this.snackBar.open('Register success', '', snackBarGreenConfig)
      .afterDismissed()
      .subscribe(() => {
        localStorage.setItem('uniq_userId', userId);
        this.store.dispatch(loginUserSuccess({
          user: {
            login: user.login,
            password: user.password,
          },
        }));
      });
  }

  logoutUser() {
    localStorage.removeItem('uniq_token');
    localStorage.removeItem('uniq_userId');
    this.store.dispatch(removeUserStore());
    this.router.navigate(['welcome']);
  }

  getCurrentUser() {
    return this.store.select(getUserStore).pipe(
      map(({ user }) => user),
    );
  }
}
