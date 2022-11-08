import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { loadUser } from 'src/app/core/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { createBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { BoardModalComponent } from '../modals/board-modal/board-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private store: Store,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    const userId = localStorage.getItem('uniq_userId');
    if (userId) { this.store.dispatch(loadUser({ userId })); }
  }

  openBoardCreater() {
    this.dialog.open(BoardModalComponent, createBoardDialogConfig);
  }

  logout() {
    this.authService.logoutUser();
  }
}
