import {
  Component, OnInit, Inject, ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { BoardsService } from 'src/app/main/services/boards/boards.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBoardDialog, IConfirmDialog, ITaskCreaterDialogData } from 'src/app/core/models/modal.model';
import { TasksService } from 'src/app/main/services/tasks/tasks.service';
import { parseJwt } from 'src/app/core/configs/tokenParse';

@Component({
  selector: 'app-task-creater-modal',
  templateUrl: './task-creater-modal.component.html',
  styleUrls: ['./task-creater-modal.component.scss'],
})
export class TaskCreaterModalComponent implements OnInit {
  public taskForm!: FormGroup;

  public currentUserId: string = parseJwt(localStorage.getItem('uniq_token') as string);

  public dialogTaskData!: ITaskCreaterDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskCreaterDialogData,
    private dialogRef: MatDialogRef<TaskCreaterModalComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService: TasksService,
  ) {
    if (data) {
      this.dialogTaskData = { ...data };
    }
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(28),
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(48),
      ]],
    });
  }

  get f() { return this.taskForm.controls; }

  closeDiadlog(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.taskService.addTask(this.dialogTaskData.column, {
      ...this.taskForm.value,
      userId: this.currentUserId,
      order: this.dialogTaskData.tasksQuantity,
      users: [],
    });
    /* else if (this.dialogTaskData.editorMode === 'editing') {
      this.taskService.editTask(this.dialogTaskData.column, {
        ...this.dialogTaskData.task,
        ...this.taskForm.value,
      });
    } */
    this.dialog.closeAll();
  }
}
