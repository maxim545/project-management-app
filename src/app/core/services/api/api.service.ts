import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  IUser, IUserLogin, IUserRequest, IUserToken,
} from '../../models/user.model';
import {
  IBoard, IBoardResponse, IBoardRequest, IColumn, IColumnPostRequest, IColumnPutRequest, IColumnResponse, ITask, ITaskPutRequest, ITaskPutResponse, ITaskRequest, ITaskResponse,
} from '../../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  /* ********  AUTH ******** */

  login(user: IUserLogin): Observable<IUserToken> {
    return this.http.post<IUserToken>('auth/signin', user);
  }

  signUp(user: IUserRequest): Observable<IUser> {
    return this.http.post<IUser>('auth/signup', user);
  }

  /* ********  USERS ******** */

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete<IUser>(`users/${id}`);
  }

  updateUser(id: string, user: IUserRequest): Observable<IUser> {
    return this.http.put<IUser>(`users/${id}`, user);
  }

  /* ********  BOARDS ******** */

  getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards');
  }

  createBoard(board: IBoardRequest): Observable<IBoard> {
    return this.http.post<IBoard>('boards', board);
  }

  getBoardById(id: string): Observable<IBoardResponse> {
    return this.http.get<IBoardResponse>(`boards/${id}`);
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`boards/${id}`);
  }

  editBoard(id: string, board: IBoardRequest): Observable<IBoard> {
    return this.http.put<IBoard>(`boards/${id}`, board);
  }

  /* ********  COLUMNS ******** */

  getAllColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.http.get<IColumnResponse[]>(`boards/${boardId}/columns`);
  }

  createColumn(boardId: string, column: IColumnPostRequest): Observable<IColumnResponse> {
    return this.http.post<IColumnResponse>(`boards/${boardId}/columns`, column);
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

  /* ********  TASKS ******** */

  getAllTasks(boardId: string, columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`);
  }

  getTasksSet(boardId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`tasksSet/${boardId}`);
  }

  createTask(boardId: string, columnId: string, task: ITaskRequest): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(`boards/${boardId}/columns/${columnId}/tasks`, task);
  }

  getTaskById(boardId: string, columnId: string, taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<IColumn>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  editTask(boardId: string, columnId: string, taskId: string, task: ITaskPutRequest): Observable<ITaskPutResponse> {
    return this.http.put<ITaskPutResponse>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task);
  }
}
