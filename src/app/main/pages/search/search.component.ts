import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { trnsttValues } from 'src/app/core/configs/lang';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
import { ITask } from 'src/app/core/models/board.model';
import { IUser } from 'src/app/core/models/user.model';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { TaskState, taskStateSelector } from 'src/app/core/store/reducers/tasks.reducers';
import { getAllTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { getUserByLogin } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string | null;

  searchType: string | null;

  tasks$: Observable<ITask[]> | null = null;

  user: IUser | null = null;

  user$: Subscription | null = null;

  searchForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private taskStore: Store<TaskState>,
    private snackBar: MatSnackBar,
    private langService: LangService,
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
      const curLng = this.langService.getCurrentLanguage();
      this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].search.request, '', snackBarRedConfig);
      throw new Error('Bad search request');
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
        } if (this.searchType === 'title') {
          return tasks.filter((task) => task.title.toLowerCase().indexOf(this.searchQuery!) > -1);
        }
        return tasks.filter((task) => task.description.toLowerCase().indexOf(this.searchQuery!.toLowerCase()) > -1);
      }),
    );
  }
}
