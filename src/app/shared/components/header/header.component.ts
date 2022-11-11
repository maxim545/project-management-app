import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  finalize,
  map, Observable, skipWhile, tap,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { loadUser } from 'src/app/core/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { createBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { ColumnsService } from 'src/app/main/services/columns/columns.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { IUser } from 'src/app/core/models/user.model';
import { UserState } from 'src/app/core/store/reducers/user.reducer';
import { parseJwt } from 'src/app/core/configs/tokenParse';
import { BoardModalComponent } from '../modals/board-modal/board-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  isLoadingUser$: Observable<boolean> = this.authService.isLoadingUser$;

  isLoadingColumns$: Observable<boolean> = this.columnsService.isLoadingColums$;

  isChecked: boolean = localStorage.getItem('uniq_lang') === 'ru' ? true : false;

  constructor(
    private store: Store,
    private authService: AuthService,
    private columnsService: ColumnsService,
    public dialog: MatDialog,
    public translate: TranslateService,
    public langService: LangService,
    private userStore: Store<UserState>,
  ) {
  }

  ngOnInit(): void {
    console.log(33);
    const userId = parseJwt(localStorage.getItem('uniq_token'));
    if (userId) {
      this.store.dispatch(loadUser({ userId }));
    }
  }

  openBoardCreater() {
    this.dialog.open(BoardModalComponent, createBoardDialogConfig);
  }

  logout() {
    this.authService.logoutUser();
  }

  changeLang() {
    this.langService.changeLanguage(this.isChecked);
    this.isChecked = !this.isChecked;
  }
}
