import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  IBoard, IColumn, IPoint, ITask,
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
  @Input() public column!: IColumn;

  @Input() public task!: ITask;

  @Input() public board: IBoard | null = null;

  @Input() public boardId: string = '';

  /*  public isCreateMode: boolean = false;

  public createPointForm!: FormGroup; */

  public points$: Observable<IPoint[]>;

  public donePoints$: Observable<IPoint[]>;

  public panelOpenState = true;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay,
    private tasksService: TasksService,
    private pointStore: Store<PointState>,
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
  }

  ngOnInit(): void {
    /* this.createPointForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    }); */
  }

  /*  get f() {
    return this.createPointForm.controls;
  } */

  deleteTask(task: ITask) {
    this.dialog.open(ConfirmModalComponent, deleteTaskDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.tasksService.deleteTask(task);
        }
      });
  }

  openTaskEditor(task: ITask): void {
    this.dialog.open(TaskModalComponent, {
      data: {
        editorMode: 'editing',
        dialogTitle: `Edit ${task.title}`,
        task,
        column: this.column,
      },
    });
  }

  openTaskDialog() {
    this.dialog.open(TaskModalComponent, {
      data: {
        task: this.task,
        points$: this.points$,
        donePoints$: this.donePoints$,
        board: this.board,
      },
      maxHeight: '100vh',
      disableClose: false,
      hasBackdrop: true,
    });
  }

  /* addPoint(task: ITask) {
    const point = {
      title: this.createPointForm.value.title,
      taskId: task._id,
      boardId: task.boardId,
      done: false,
    };
    this.pointsService.addPoint(point);
    this.isCreateMode = false;
    this.createPointForm.controls['title'].setValue((''));
  } */
}
