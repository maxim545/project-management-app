import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private store: Store,
  ) { }

  addTask(boardId: string) {
  }

  editTask(boardId: string, columnId: string) {
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    this.store.dispatch(deleteTask({ boardId, columnId, taskId }));
  }
}
