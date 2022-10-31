import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  IUser, IUserLogin, IUserRegister, IUserToken,
} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  /* ********  USERS ******** */
  login(user: IUserLogin): Observable<HttpResponse<IUserToken>> {
    return this.http.post<IUserToken>('signin', user, { observe: 'response' });
  }

  signUp(user: IUserRegister): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>('signup', user, { observe: 'response' });
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }

  updateUser(id: string, user: IUserRegister): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(`users/${id}`, user, { observe: 'response' });
  }

  getUserById(id: string) {
    return this.http.get<IUser>(`users/${id}`);
  }
}
