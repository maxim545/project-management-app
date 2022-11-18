import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { BoardsService } from 'src/app/main/services/boards/boards.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBoardDialog, IConfirmDialog, ITaskDialogData } from 'src/app/core/models/modal.model';
import { TasksService } from 'src/app/main/services/tasks/tasks.service';
import { parseJwt } from 'src/app/core/configs/tokenParse';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public taskForm!: FormGroup;

  public currentUserId: string = parseJwt(localStorage.getItem('uniq_token') as string);

  public dialogTaskData!: ITaskDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskDialogData,
    private dialogRef: MatDialogRef<TaskModalComponent>,
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
      title: [this.dialogTaskData?.task.title, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(28),
      ]],
      description: [this.dialogTaskData?.task.description, [
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
    if (this.dialogTaskData.editorMode === 'adding') {
      this.taskService.addTask(this.dialogTaskData.column, {
        ...this.taskForm.value,
        userId: this.currentUserId,
        order: this.dialogTaskData.tasksQuantity,
        users: [],
      });
    } else if (this.dialogTaskData.editorMode === 'editing') {
      this.taskService.editTask(this.dialogTaskData.column, {
        ...this.dialogTaskData.task,
        ...this.taskForm.value,
      });
    }
    this.dialog.closeAll();
  }
}
