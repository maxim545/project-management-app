import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { loadUser } from 'src/app/core/store/actions/user.actions';

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
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }

  logout() {
    this.authService.logoutUser();
  }
}
