import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { IUser } from 'src/app/core/models/user.model';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { TaskState, taskStateSelector } from 'src/app/core/store/reducers/tasks.reducers';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getAllTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { getCurrentUser, getUserByLogin } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string | null;

  searchType: string | null;

  tasks$: Observable<ITask[]> | null = null;

  public user: IUser | null = null;

  public user$: Subscription | null = null;

  public searchForm!: FormGroup;
  /*
  public column$: Observable<IColumn[]> = this.columnStore.pipe(select(getAllColumns));

  board$: Observable<IBoard[]> = this.boardStore.pipe(select(getAllBoards)); */

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private taskStore: Store<TaskState>,
    private columnStore: Store<ColumnState>,
    private boardStore: Store<BoardState>,
  ) {
    this.searchQuery = this.route.snapshot.queryParamMap.get('search_query');
    this.searchType = this.route.snapshot.queryParamMap.get('type');
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    });
    if (this.searchQuery && this.searchType) {
      this.searchTasks();
    } else {
      console.error('Bad search request');
    }
  }

  get f() {
    return this.searchForm.controls;
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  searchTasks() {
    if (this.searchType === 'users' && this.searchQuery) {
      this.user$ = this.store
        .select(getUserByLogin(this.searchQuery))
        .subscribe((userData) => {
          this.user = userData || null;
        });
    }
    this.tasks$ = this.taskStore.pipe(
      select(getAllTasks),
      map((tasks) => {
        if (this.searchType === 'users' && this.user) {
          return tasks.filter((task) => task.users.includes(this.user!._id));
        }
        return tasks.filter((task: ITask) => task[this.searchType as keyof ITask] === this.searchQuery);
      }),
    );
  }
}
