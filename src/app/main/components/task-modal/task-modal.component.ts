import {
  Component, Inject, OnInit, ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { IBoard, IPoint, ITask } from 'src/app/core/models/board.model';
import { ITaskDialogData } from 'src/app/core/models/modal.model';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IUser } from 'src/app/core/models/user.model';
import { select, Store } from '@ngrx/store';
import { getUsers } from 'src/app/core/store/selectors/user.selectors';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TaskState, taskStateSelector } from 'src/app/core/store/reducers/tasks.reducers';
import { selectEntity } from 'src/app/core/store/selectors/tasks.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
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
  public points$!: Observable<IPoint[]>;

  public donePoints$!: Observable<IPoint[]>;

  public isLoadingTasks$: Observable<boolean> = this.taskService.isLoadingTasks$;

  public isLoadingPoint$: Observable<boolean> = this.pointsService.isLoadingPoint$;

  public task!: ITask;

  public task$: Observable<ITask | undefined>;

  public isEditTitleMode: boolean = false;

  public isEditDescrMode: boolean = false;

  public isCreateMode: boolean = false;

  public editTitleForm!: FormGroup;

  public editDescrForm!: FormGroup;

  public createPointForm!: FormGroup;

  public selectedUsers$: Observable<IUser[]> = this.boardsService.selectedUsers$;

  public selectedTaskUsers!: IUser[];

  public users!: IUser[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskDialogData,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    public dialog: MatDialog,
    private boardsService: BoardsService,
    private taskService: TasksService,
    private pointsService: PointsService,
    private filesService: FilesService,
    private store: Store,
    private apiService: ApiService,
    private taskStore: Store<TaskState>,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.task = this.data.task;
      this.points$ = this.data.points$;
      this.donePoints$ = this.data.donePoints$;
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

  getFiles(task: ITask) {
    this.apiService.getFilesByUserId(task.boardId).subscribe((data) => {
      console.log(data);
    });
  }

  addNewFile(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const fileToUpload = eventTarget.files![0];
    if (fileToUpload) {
      this.filesService.uploadFile(fileToUpload, this.task);
    }
  }
}
