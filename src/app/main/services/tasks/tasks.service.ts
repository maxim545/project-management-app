import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IColumn, IColumnSet, ITask, ITaskPutRequest, ITaskRequest, ITaskSet,
} from 'src/app/core/models/board.model';
import {
  addTask, deleteTask, editTask, updateTasksSet, updTasksBetweenColumns,
} from 'src/app/core/store/actions/columns.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private store: Store,
  ) { }

  addTask(column: IColumn, task: ITaskRequest) {
    this.store.dispatch(addTask({ column, task }));
  }

  editTask(column: IColumn, task: ITask) {
    this.store.dispatch(editTask({ column, task }));
  }

  editSetTasks(column: IColumn, tasks: ITask[]) {
    const updatedTasks: ITaskSet[] = [];
    tasks.forEach((task, i) => {
      updatedTasks.push({
        _id: task._id,
        order: i,
        columnId: task.columnId,
      });
    });
    this.store.dispatch(updateTasksSet({ column, tasks: updatedTasks }));
  }

  editTasksBetweenColumns(columns: IColumn[], previousTasks: ITask[], currentTasks: ITask[]) {
    const updPreviousTasks: ITaskSet[] = [];
    previousTasks.forEach((task, i) => {
      updPreviousTasks.push({
        _id: task._id,
        order: i,
        columnId: task.columnId,
      });
    });
    const updCurrentTasks: ITaskSet[] = [];
    currentTasks.forEach((task, i) => {
      updCurrentTasks.push({
        _id: task._id,
        order: i,
        columnId: task.columnId,
      });
    });
    this.store.dispatch(updTasksBetweenColumns({ columns, tasks: [...updPreviousTasks, ...updCurrentTasks] }));
  }

  deleteTask(column: IColumn, task: ITask) {
    this.store.dispatch(deleteTask({ column, task }));
  }
}
