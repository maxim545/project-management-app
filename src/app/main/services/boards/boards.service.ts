import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IBoardRequest } from 'src/app/core/models/board.model';
import {
  addBoard, deleteBoard, editBoard,
} from 'src/app/core/store/actions/boards.actions';
import { boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { getBoardLoadingStatus } from 'src/app/core/store/selectors/boards.selectors';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  isLoadingBoards$: Observable<boolean>;

  constructor(
    private store: Store,
  ) {
    this.isLoadingBoards$ = this.store.pipe(select(getBoardLoadingStatus));
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
