import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  IBoard, IColumn, IFile, IPoint, ITask,
} from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteTaskDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';
import { PointState } from 'src/app/core/store/reducers/points.reducers';
import { getAllPoints } from 'src/app/core/store/selectors/points.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';

import { selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { Overlay } from '@angular/cdk/overlay';
import { FileState } from 'src/app/core/store/reducers/files.reducers';
import { getAllFiles } from 'src/app/core/store/selectors/files.selectors';
import { TasksService } from '../../services/tasks/tasks.service';
import { PointsService } from '../../services/points/points.service';
import { PointComponent } from '../point/point.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public task!: ITask;

  public points$: Observable<IPoint[]>;

  public files$: Observable<IFile[]>;

  public donePoints$: Observable<IPoint[]>;

  public panelOpenState = true;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay,
    private tasksService: TasksService,
    private pointStore: Store<PointState>,
    private fileStore: Store<FileState>,
    private pointsService: PointsService,
    private boardStore: Store<BoardState>,
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

  deleteTask(task: ITask) {
    this.dialog.open(ConfirmModalComponent, deleteTaskDialogConfig)
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
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'task-dialog',
    });
  }
}
