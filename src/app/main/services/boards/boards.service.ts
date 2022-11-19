import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject, map, Observable, Subject,
} from 'rxjs';
import { IBoardRequest } from 'src/app/core/models/board.model';
import {
  addBoard, deleteBoard, editBoard,
} from 'src/app/core/store/actions/boards.actions';
import { boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { getBoardLoadingStatus } from 'src/app/core/store/selectors/boards.selectors';
import { IUser } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  isLoadingBoards$: Observable<boolean>;

  users$ = new BehaviorSubject<IUser[]>([]);

  selectedUsers$ = this.users$.asObservable();

  constructor(
    private store: Store,
  ) {
    this.isLoadingBoards$ = this.store.pipe(select(getBoardLoadingStatus));
  }

  setSelectedUsers(data: IUser[] | null) {
    if (data) {
      this.users$.next(data);
    }
  }

  addBoard(board: IBoardRequest) {
    this.store.dispatch(addBoard({ board }));
  }

  editBoard(id: string, board: IBoardRequest) {
    this.store.dispatch(editBoard({ id, board }));
  }

  deleteBoard(id: string) {
    this.store.dispatch(deleteBoard({ id }));
  }
}
