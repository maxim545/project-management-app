import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import {
  Observable, BehaviorSubject, map, Subject, filter, switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUserSuccess } from 'src/app/core/store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private store: Store,
  ) { }

  saveCurrentUser(login: string) {
    return this.apiService.getUsers()
      .pipe(map((users) => users.filter((user) => user.login === login)))
      .subscribe((res) => {
        const [responseUser] = res;
        this.store.dispatch(loadUserSuccess({ user: responseUser }));
        localStorage.setItem('uniq_userId', responseUser.id);
      });
  }
}
