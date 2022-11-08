import { Injectable } from '@angular/core';
import {
  ILoginRequest, ISignUpRequest, IUserToken, IUser,
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
  loadUser, removeUser,
} from 'src/app/core/store/actions/user.actions';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  isLoading$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) {
    this.isLoggedIn$ = this.store
      .select(getUserStore)
      .pipe(map((data) => data.isLoggedIn));

    this.isLoading$ = this.store
      .select(getUserStore)
      .pipe(map((data) => data.isLoading));
  }

  loginUser(user: ILoginRequest) {
    this.router.navigate(['main']);
    this.snackBar.open('Success', '', snackBarGreenConfig);
  }

  logoutUser() {
    this.store.dispatch(cleanUserStore());
    this.snackBar.open('Logout success', '', snackBarGreenConfig);
  }

  updateUser() {
    this.snackBar.open('Your data has been updated', '', snackBarGreenConfig);
  }
}
