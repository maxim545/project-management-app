import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBoardForm } from 'src/app/core/models/board.model';
import { addBoard, deleteBoard, editBoard } from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(
    private store: Store,
  ) { }

  addBoard(board: IBoardForm) {
    this.store.dispatch(addBoard({ board }));
  }

  editBoard(id: string, data: IBoardForm) {
    const board = { id, ...data };
    this.store.dispatch(editBoard({ board }));
  }

  deleteBoard(id: string) {
    this.store.dispatch(deleteBoard({ id }));
  }
}
