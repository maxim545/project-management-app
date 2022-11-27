import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { loadUsers } from 'src/app/core/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { createBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { ColumnsService } from 'src/app/main/services/columns/columns.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { IUser } from 'src/app/core/models/user.model';
import { parseJwt } from 'src/app/core/utils/tokenParse';
import { TasksService } from 'src/app/main/services/tasks/tasks.service';
import { loadTasks } from 'src/app/core/store/actions/tasks.actions';
import { loadFiles } from 'src/app/core/store/actions/files.actions';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/main/services/boards/boards.service';
import { BoardModalComponent } from '../modals/board-modal/board-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  isLoadingUser$: Observable<boolean> = this.authService.isLoadingUser$;

  isLoadingBoards$: Observable<boolean> = this.boardService.isLoadingBoards$;

  isLoadingColumns$: Observable<boolean> = this.columnsService.isLoadingColums$;

  isLoadingTasks$: Observable<boolean> = this.taskService.isLoadingTasks$;

  isChecked: boolean = localStorage.getItem('uniq_lang') === 'ru' ? true : false;

  isActive: boolean = false;

  user$: Observable<IUser | null> = this.store.select(getUserStore).pipe(map(({ user }) => user));

  constructor(
    private store: Store,
    private authService: AuthService,
    private boardService: BoardsService,
    private columnsService: ColumnsService,
    private taskService: TasksService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private langService: LangService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('uniq_token')) {
      this.store.dispatch(
        loadUsers({ id: parseJwt(localStorage.getItem('uniq_token')) }),
      );
    }
    this.isLoggedIn$ = this.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          const userId = parseJwt(localStorage.getItem('uniq_token'));
          this.store.dispatch(loadBoards({ userId }));
          this.store.dispatch(loadTasks({ id: userId }));
          this.store.dispatch(loadFiles({ userId }));
        }
        return isLoggedIn;
      }),
    );
  }

  openBoardCreater() {
    this.isActive = !this.isActive;
    this.dialog.open(BoardModalComponent, createBoardDialogConfig);
  }

  logout() {
    this.isActive = !this.isActive;
    this.authService.logoutUser();
  }

  changeLang() {
    this.langService.changeLanguage(this.isChecked);
    this.isChecked = !this.isChecked;
  }

  openMain() {
    if (!this.isActive || window.innerWidth > 768) {
      this.router.navigate(['/main']);
    }
  }

  bodyHidden() {
    const body = <HTMLElement>document.querySelector('body');
    body.classList.toggle('overflowHidden');
  }
}
