import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { BoardsService } from 'src/app/main/services/boards/boards.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBoardDialog, IConfirmDialog, ITaskDialog } from 'src/app/core/models/modal.model';
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

  public dialogTitle: string = '';

  public column: IColumn | null = null;

  public task: ITask | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskDialog,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService: TasksService,
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle;
      this.column = data.column;
      this.task = data.task;
    }
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: [this.task?.title, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(28),
      ]],
      description: [this.task?.description, [
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
    if (!this.task?._id && this.column) {
      this.taskService.addTask(this.column, {
        ...this.taskForm.value,
        userId: this.currentUserId,
        order: this.column.tasks?.length,
        users: [],
      });
    } else if (this.task && this.column) {
      this.taskService.editTask(this.column, {
        ...this.task,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
      });
    }
    this.dialog.closeAll();
  }
}
