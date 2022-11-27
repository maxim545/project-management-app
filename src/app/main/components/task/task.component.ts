import {
  Component, Input, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import {
  IBoard, IColumn, IFile, IPoint, ITask,
} from 'src/app/core/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteTaskDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { PointState } from 'src/app/core/store/reducers/points.reducers';
import { getAllPoints } from 'src/app/core/store/selectors/points.selectors';
import { FileState } from 'src/app/core/store/reducers/files.reducers';
import { getAllFiles } from 'src/app/core/store/selectors/files.selectors';
import { TasksService } from '../../services/tasks/tasks.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() task!: ITask;

  points$: Observable<IPoint[]>;

  files$: Observable<IFile[]>;

  donePoints$: Observable<IPoint[]>;

  panelOpenState = true;

  dialog$: Subscription | null = null;

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
    private pointStore: Store<PointState>,
    private fileStore: Store<FileState>,
  ) {
    this.points$ = this.pointStore.pipe(
      select(getAllPoints),
      map((points) => points.filter((point) => point.taskId === this.task._id)),
    );
    this.donePoints$ = this.pointStore.pipe(
      select(getAllPoints),
      map((points) => points.filter((point) => point.taskId === this.task._id && point.done === true)),
    );
    this.files$ = this.fileStore.pipe(
      select(getAllFiles),
      map((files) => files.filter((file) => file.taskId === this.task._id)),
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dialog$) {
      this.dialog$.unsubscribe();
    }
  }

  deleteTask(task: ITask) {
    this.dialog$ = this.dialog
      .open(ConfirmModalComponent, deleteTaskDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.tasksService.deleteTask(task);
        }
      });
  }

  openTaskDialog() {
    this.dialog.open(TaskModalComponent, {
      data: {
        task: this.task,
        points$: this.points$,
        donePoints$: this.donePoints$,
        files$: this.files$,
      },
      maxHeight: '100vh',
      panelClass: 'task-dialog',
    });
  }
}
