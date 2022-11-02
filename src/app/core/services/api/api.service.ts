import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  IUser, IUserLogin, IUserRegister, IUserToken,
} from '../../models/user.model';
import {
  IBoard, IBoardBybId, IBoardForm, IColumn, IColumnPostRequest, IColumnPutRequest, IColumnResponse,
} from '../../models/board.model';

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

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete<IUser>(`users/${id}`);
  }

  updateUser(id: string, user: IUserRegister): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(`users/${id}`, user, { observe: 'response' });
  }

  /* ********  BOARDS ******** */

  getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards');
  }

  createBoard(board: IBoardForm): Observable<HttpResponse<IBoard>> {
    return this.http.post<IBoard>('boards', board, { observe: 'response' });
  }

  getBoardById(id: string): Observable<IBoardBybId> {
    return this.http.get<IBoardBybId>(`boards/${id}`);
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`boards/${id}`);
  }

  editBoard(id: string, board: IBoardForm): Observable<HttpResponse<IBoard>> {
    return this.http.put<IBoard>(`boards/${id}`, board, { observe: 'response' });
  }

  /* ********  COLUMNS ******** */

  getAllColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.http.get<IColumnResponse[]>(`boards/${boardId}/columns`);
  }

  createColumn(id: string, column: IColumnPostRequest): Observable<IColumnResponse> {
    return this.http.post<IColumnResponse>(`boards/${id}/columns`, column);
  }

  getColumnById(boardId: string, columnId: string): Observable<IColumn> {
    return this.http.get<IColumn>(`boards/${boardId}/columns/${columnId}`);
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IColumn>(`boards/${boardId}/columns/${columnId}`);
  }

  editColumn(boardId: string, columnId: string, column: IColumnPutRequest): Observable<IColumnResponse> {
    return this.http.put<IColumnResponse>(`boards/${boardId}/columns/${columnId}`, column);
  }
}
