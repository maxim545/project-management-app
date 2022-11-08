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

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) {
    this.isLoggedIn$ = this.store
      .select(getUserStore)
      .pipe(map(({ user }) => !!user));
  }

  loginUser(user: ILoginRequest) {
    this.snackBar.open('Success', '', snackBarGreenConfig)
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['main']);
      });
  }

  logoutUser() {
    this.store.dispatch(cleanUserStore());
  }
}
