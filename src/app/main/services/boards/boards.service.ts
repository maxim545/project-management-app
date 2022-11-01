import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBoardForm } from 'src/app/core/models/board.model';
import { addBoard } from 'src/app/core/store/actions/boards.actions';

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
}
