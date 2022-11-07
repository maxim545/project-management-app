import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBoardRequest } from 'src/app/core/models/board.model';
import {
  addBoard, deleteBoard, editBoard, getCurrentBoard,
} from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(
    private store: Store,
  ) { }

  addBoard(board: IBoardRequest) {
    this.store.dispatch(addBoard({ board }));
  }

  editBoard(id: string, data: IBoardRequest) {
    const board = { id, ...data };
    this.store.dispatch(editBoard({ board }));
  }

  getCurrentBoard(id: string) {
    this.store.dispatch(getCurrentBoard({ id }));
  }

  deleteBoard(id: string) {
    this.store.dispatch(deleteBoard({ id }));
  }
}
