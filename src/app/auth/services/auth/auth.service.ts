import { Injectable } from '@angular/core';
import { IUserLogin, IUserRegister } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() { }

  loginUser(currentUser: IUserLogin) {
  }

  signUpUser(user: IUserRegister) {

  }
}
