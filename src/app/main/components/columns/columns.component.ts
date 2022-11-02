import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  @Input() public columns: IColumn[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }
}
