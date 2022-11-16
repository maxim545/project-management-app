import { Injectable } from '@angular/core';
import {
  IUserLogin, IUserRequest, IUserToken, IUser,
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
  removeUser,
} from 'src/app/core/store/actions/user.actions';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { trnsttValues } from 'src/app/core/configs/lang';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { clearBoards } from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  isLoadingUser$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
    public langService: LangService,
  ) {
    this.isLoggedIn$ = this.store
      .select(getUserStore)
      .pipe(map((data) => data.isLoggedIn));

    this.isLoadingUser$ = this.store
      .select(getUserStore)
      .pipe(map((data) => data.isLoading));
  }

  loginUser(user: IUserLogin) {
    this.router.navigate(['main']);
    const curLng = this.langService.getCurrentLanguage();
    this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].user.login, '', snackBarGreenConfig);
  }

  logoutUser() {
    this.store.dispatch(clearBoards());
    this.store.dispatch(cleanUserStore());
  }

  updateUser() {
    this.snackBar.open('Your data has been updated', '', snackBarGreenConfig);
  }
}
