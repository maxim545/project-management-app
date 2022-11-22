import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  IColumn, IColumnSet, ITask, ITaskPutRequest, ITaskRequest, ITaskSet,
} from 'src/app/core/models/board.model';
import {
  addTask, deleteTask, editTask, updateTasksOrder,
} from 'src/app/core/store/actions/tasks.actions';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';

import { TaskState, taskStateSelector } from 'src/app/core/store/reducers/tasks.reducers';
import { getTaskLoadingStatus, selectEntity } from 'src/app/core/store/selectors/tasks.selectors';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  isLoadingTasks$: Observable<boolean>;

  constructor(
    private store: Store,
    private boardStore: Store<BoardState>,
    private taskStore: Store<TaskState>,
  ) {
    this.isLoadingTasks$ = this.store.pipe(select(getTaskLoadingStatus));
    /* this.taskStore.pipe(
      select(taskStateSelector),
      select(selectEntity('63710526dbf736ec97671951')),
      map((board) => board),
    ).subscribe((data) => console.log(data)); */
  }

  addTask(column: IColumn, task: ITaskRequest) {
    this.store.dispatch(addTask({ column, task }));
  }

  editTask(task: ITask) {
    this.store.dispatch(editTask({ task }));
  }

  editSetTasks(tasks: ITask[]) {
    const updatedTasks: ITaskSet[] = [];
    tasks.forEach((task, i) => {
      updatedTasks.push({
        _id: task._id,
        order: i,
        columnId: task.columnId,
      });
    });
    this.store.dispatch(updateTasksOrder({ tasks: updatedTasks }));
  }

  editTasksBetweenColumns(previousTasks: ITask[], currentTasks: ITask[], previousColumnId: string, currentColumnId: string) {
    const updPreviousTasks: ITaskSet[] = [];
    previousTasks.forEach((task, i) => {
      updPreviousTasks.push({
        _id: task._id,
        order: i,
        columnId: previousColumnId,
      });
    });
    const updCurrentTasks: ITaskSet[] = [];
    currentTasks.forEach((task, i) => {
      updCurrentTasks.push({
        _id: task._id,
        order: i,
        columnId: currentColumnId,
      });
    });
    this.store.dispatch(updateTasksOrder({ tasks: [...updPreviousTasks, ...updCurrentTasks] }));
  }

  deleteTask(task: ITask) {
    this.store.dispatch(deleteTask({ task }));
  }
}
