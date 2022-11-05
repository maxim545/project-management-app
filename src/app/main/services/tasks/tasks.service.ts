import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITaskPutRequest, ITaskRequest } from 'src/app/core/models/board.model';
import { addTask, deleteTask, editTask } from 'src/app/core/store/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private store: Store,
  ) { }

  addTask(boardId: string, columnId: string, task: ITaskRequest) {
    this.store.dispatch(addTask({ boardId, columnId, task }));
  }

  editTask(boardId: string, columnId: string, taskId: string, task: ITaskPutRequest) {
    this.store.dispatch(editTask({
      boardId, columnId, taskId, task,
    }));
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    this.store.dispatch(deleteTask({ boardId, columnId, taskId }));
  }
}
