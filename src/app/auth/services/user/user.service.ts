import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import {
  Observable, BehaviorSubject, map, Subject, filter, switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }

  saveCurrentUser(login: string) {
    return this.apiService.getUsers()
      .pipe(map((users) => users.filter((user) => user.login === login)))
      .subscribe((res) => {
        const [responseUser] = res;
        localStorage.setItem('uniq_userId', responseUser.id);
      });
  }
}
