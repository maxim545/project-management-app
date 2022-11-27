import {
  Component, Inject, OnInit, ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import {
  IBoard, IFile, IPoint, ITask,
} from 'src/app/core/models/board.model';
import { ITaskDialogData } from 'src/app/core/models/modal.model';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IUser } from 'src/app/core/models/user.model';
import { select, Store } from '@ngrx/store';
import { TaskState, taskStateSelector } from 'src/app/core/store/reducers/tasks.reducers';
import { selectEntity } from 'src/app/core/store/selectors/tasks.selectors';
import { TasksService } from '../../services/tasks/tasks.service';
import { PointsService } from '../../services/points/points.service';
import { BoardsService } from '../../services/boards/boards.service';
import { FilesService } from '../../services/files/files.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  points$!: Observable<IPoint[]>;

  donePoints$!: Observable<IPoint[]>;

  files$!: Observable<IFile[]>;

  isLoadingTasks$: Observable<boolean> = this.taskService.isLoadingTasks$;

  isLoadingPoint$: Observable<boolean> = this.pointsService.isLoadingPoint$;

  isLoadingFile$: Observable<boolean> = this.filesService.isLoadingFile$;

  task!: ITask;

  task$: Observable<ITask | undefined>;

  isEditTitleMode: boolean = false;

  isEditDescrMode: boolean = false;

  isCreateMode: boolean = false;

  editTitleForm!: FormGroup;

  editDescrForm!: FormGroup;

  createPointForm!: FormGroup;

  selectedUsers$: Observable<IUser[]> = this.boardsService.selectedUsers$;

  selectedTaskUsers!: IUser[];

  users!: IUser[];

  fileName: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskDialogData,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private dialog: MatDialog,
    private boardsService: BoardsService,
    private taskService: TasksService,
    private pointsService: PointsService,
    private filesService: FilesService,
    private taskStore: Store<TaskState>,
  ) {
    if (data) {
      this.task = this.data.task;
      this.points$ = this.data.points$;
      this.donePoints$ = this.data.donePoints$;
      this.files$ = this.data.files$;
    }
    this.task$ = this.taskStore.pipe(
      select(taskStateSelector),
      select(selectEntity(this.task._id)),
      map((task) => task),
    );
  }

  ngOnInit(): void {
    this.selectedUsers$ = this.selectedUsers$.pipe(
      map((users) => {
        this.users = users.filter((user) => this.task.users.includes(user._id)) || null;
        this.selectedTaskUsers = [...this.users];
        return users;
      }),
    );
    this.editTitleForm = new FormGroup({
      title: new FormControl(this.task.title, [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
    this.editDescrForm = new FormGroup({
      description: new FormControl(this.task.description, [
        Validators.required,
        Validators.maxLength(320),
      ]),
    });
    this.createPointForm = new FormGroup({
      point: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }

  get title() {
    return this.editTitleForm.controls['title'];
  }

  get description() {
    return this.editDescrForm.controls['description'];
  }

  get point() {
    return this.createPointForm.controls['point'];
  }

  getDonePercent(donePoints: IPoint[], points: IPoint[]) {
    return Math.floor((donePoints.length * 100) / points.length) || 0;
  }

  editTaskTitle(task: ITask) {
    if (task.title !== this.editTitleForm.value.title) {
      this.taskService.editTask({
        ...task,
        ...this.editTitleForm.value,
      });
      this.isEditTitleMode = false;
    }
  }

  editTaskDescr(task: ITask) {
    if (task.description !== this.editDescrForm.value.description) {
      this.taskService.editTask({
        ...task,
        ...this.editDescrForm.value,
      });
      this.isEditDescrMode = false;
    }
  }

  addUserForTask(task: ITask) {
    const currentUserIds = this.users?.map((user) => user._id);
    if (this.selectedTaskUsers.length !== this.users.length) {
      this.selectedTaskUsers = [...this.users];
      this.taskService.editTask({
        ...task,
        users: currentUserIds,
      });
    }
  }

  addPoint(task: ITask) {
    const point = {
      title: this.createPointForm.value.point,
      taskId: task._id,
      boardId: task.boardId,
      done: false,
    };
    this.pointsService.addPoint(point);
    this.isCreateMode = false;
    this.createPointForm.controls['point'].setValue((''));
  }

  closeTaskModal(): void {
    this.dialog.closeAll();
  }

  addNewFile(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const fileToUpload = eventTarget.files![0];
    this.fileName = fileToUpload.name;
    if (fileToUpload) {
      this.filesService.uploadFile(fileToUpload, this.task);
    }
  }
}
