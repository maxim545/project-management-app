import { Component, Inject, OnInit } from '@angular/core';
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
import { getAllBoards, selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { PointsService } from '../../services/points/points.service';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public points$!: Observable<IPoint[]>;

  public donePoints$!: Observable<IPoint[]>;

  public task!: ITask;

  /* public board: IBoard | null = null; */

  /* public board$: Observable<IBoard | null>; */

  public isEditTitleMode: boolean = false;

  public isEditDescrMode: boolean = false;

  public isCreateMode: boolean = false;

  public editTitleForm!: FormGroup;

  public editDescrForm!: FormGroup;

  public createPointForm!: FormGroup;

  /* public users$: Observable<IUser[] | null> = this.store.select(getUsers); */

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
    private store: Store,
    private boardStore: Store<BoardState>,
    private apiService: ApiService,
  ) {
    if (data) {
      this.task = this.data.task;
      this.points$ = this.data.points$;
      this.donePoints$ = this.data.donePoints$;
    }
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
      ]),
    });
    this.editDescrForm = new FormGroup({
      description: new FormControl(this.task.description, [
        Validators.maxLength(320),
      ]),
    });
    this.createPointForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.editTitleForm.controls;
  }

  editTaskTitle(task: ITask) {
    this.taskService.editTask({
      ...task,
      ...this.editDescrForm.value,
    });
  }

  editTaskDescr(task: ITask) {
    this.taskService.editTask({
      ...task,
      ...this.editTitleForm.value,
    });
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
      title: this.createPointForm.value.title,
      taskId: task._id,
      boardId: task.boardId,
      done: false,
    };
    this.pointsService.addPoint(point);
    this.isCreateMode = false;
    this.createPointForm.controls['title'].setValue((''));
  }

  closeTaskModal(): void {
    this.dialog.closeAll();
  }

  fileChange(files: FileList) {
    const fileToUpload = files[0];
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('boardId', this.task.boardId);
      formData.append('taskId', this.task._id);
      formData.append('file', fileToUpload, fileToUpload.name);
      console.log(formData);
      this.apiService.uploadFile(formData).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
