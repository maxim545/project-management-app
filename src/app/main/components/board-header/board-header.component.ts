import { Component, Input, OnInit } from '@angular/core';
import { IBoardBybId } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  @Input() public board: IBoardBybId | null = null;

  constructor() { }

  ngOnInit(): void {
  }
}
