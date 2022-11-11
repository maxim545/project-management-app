import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IBoard } from 'src/app/core/models/board.model';
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

  public boardId: string = '';

  public columnId: string = '';

  public taskId: string = '';

  public order: number = 1;

  public taskTitle: string = '';

  public taskDescr: string = '';

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
      this.boardId = data.boardId;
      this.columnId = data.columnId;
      this.taskTitle = data.taskTitle;
      this.taskDescr = data.taskDescr;
      this.taskId = data.taskId;
      this.order = data.order;
    }
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: [this.taskTitle, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(28),
      ]],
      description: [this.taskDescr, [
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
    if (!this.taskId) {
      this.taskService.addTask(this.boardId, this.columnId, {
        ...this.taskForm.value,
        userId: this.currentUserId,
        order: 0,
        users: [],
      });
    } else {
      this.taskService.editTask(this.boardId, this.columnId, this.taskId, {
        ...this.taskForm.value,
        order: this.order,
        userId: this.currentUserId,
        boardId: this.boardId,
        columnId: this.columnId,
      });
    }
    this.dialog.closeAll();
  }
}
