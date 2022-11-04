import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IColumn, ITask } from 'src/app/core/models/board.model';
import { getCurrentColumn, loadTasks } from 'src/app/core/store/actions/columns.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public columns$!: Observable<IColumn[]>;

  @Input() public columnId!: string;

  public boardId = this.router.snapshot.paramMap.get('id') as string;

  public tasks$!: Observable<ITask[] | undefined>;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.columns$.pipe(
      map((columns) => {
        const currentBoard = columns.find((column) => column.id === this.columnId) || null;
        if (currentBoard) {
          return currentBoard.tasks;
        }
        return undefined;
      }),
    );
  }
}
