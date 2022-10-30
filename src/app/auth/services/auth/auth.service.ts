import { Injectable } from '@angular/core';
import { IUserLogin } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() { }

  loginUser(currentUser: IUserLogin) {

  }
}
