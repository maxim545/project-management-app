import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
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
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { IBoard } from 'src/app/core/models/board.model';
import { Dictionary } from '@ngrx/entity';
import { loadColumns } from 'src/app/core/store/actions/columns.actions';
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

  isChecked: boolean = localStorage.getItem('uniq_lang') === 'ru' ? true : false;

  public user$!: Observable<IUser | null>;

  public boardId: string | null = '636e28a9dbf736ec9767126a';

  constructor(
    private store: Store,
    private authService: AuthService,
    private boardService: BoardsService,
    private columnsService: ColumnsService,
    public dialog: MatDialog,
    public translate: TranslateService,
    public langService: LangService,
    private userStore: Store<UserState>,
    private boardStore: Store<BoardState>,
  ) {
  }

  ngOnInit(): void {
    const userId = parseJwt(localStorage.getItem('uniq_token'));
    if (userId) {
      this.store.dispatch(loadUser({ userId }));
    }
    this.user$ = this.store
      .select(getUserStore)
      .pipe(
        skipWhile((flag) => flag.isLoggedIn),
        map(({ user }) => {
          if (user) {
            this.store.dispatch(loadBoards({ userId }));
            return user;
          }
          return null;
        }),
      );
    /* this.board$ =  *//* this.store
      .select(getUserStore).subscribe((data) => {
        console.log(data);
      }); */
    /* .pipe(
      select(boardStateSelector),
      skipWhile((flag) => flag.isLoading),
      map((boards) => {
        if (this.boardId && boards.entities[this.boardId]) {
          localStorage.setItem('user', '1');
          this.store.dispatch(loadColumns({ id: this.boardId }));
          return boards.entities[this.boardId] as IBoardResponse;
        }
        throw new Error('Board id is not valid');
      }),
    ); */
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
