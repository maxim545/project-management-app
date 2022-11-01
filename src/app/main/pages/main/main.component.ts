import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$!: Observable<IBoard[]>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.boards$ = this.store.select(getCurrentBoards);
  }
}
