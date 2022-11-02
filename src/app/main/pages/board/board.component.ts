import {
  Component, OnInit, OnDestroy, AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBoard, IBoardBybId } from 'src/app/core/models/board.model';
import { Subscription } from 'rxjs';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public boards$!: Subscription;

  public boardId: string | null = this.router.snapshot.paramMap.get('id');

  public board: IBoardBybId | null = null;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private boardsService: BoardsService,
  ) {

  }

  ngOnInit(): void {
    this.boards$ = this.store.select(getCurrentBoards).subscribe((boards) => {
      this.board = boards.find((item) => item.id === this.boardId) || null;
    });
    this.boardsService.getCurrentBoard(this.boardId);
  }

  ngOnDestroy(): void {
    this.boards$.unsubscribe();
  }
}
