import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBoard } from 'src/app/core/models/board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boards$: Subscription;

  public boardId = this.router.snapshot.paramMap.get('id');

  public board: IBoard | null = null;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
  ) {
    this.boards$ = this.store.select(getCurrentBoards).subscribe((boards) => {
      this.board = boards.find((item) => item.id === this.boardId) || null;
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.boards$.unsubscribe();
  }
}
