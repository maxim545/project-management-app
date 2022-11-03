import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IColumn, ITask } from 'src/app/core/models/board.model';
import { getCurrentColumn, loadTasks } from 'src/app/core/store/actions/columns.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public column!: IColumn;

  public boardId = this.router.snapshot.paramMap.get('id') as string;

  public tasks$!: Observable<ITask[]>;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    /* this.store.dispatch(getCurrentColumn({ boardId: this.boardId, columnId: this.column.id })); */
    /* this.tasks$ = this.store.select(getCurrentColumns); */
    /* this.store.dispatch(loadTasks({ boardId: this.boardId, columnId: this.column.id })); */
  }
}
