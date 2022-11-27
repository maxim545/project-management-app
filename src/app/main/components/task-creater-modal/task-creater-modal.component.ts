import {
  Component, OnInit, Inject, ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBoardDialog, IConfirmDialog, ITaskCreaterDialogData } from 'src/app/core/models/modal.model';
import { TasksService } from 'src/app/main/services/tasks/tasks.service';
import { parseJwt } from 'src/app/core/utils/tokenParse';

@Component({
  selector: 'app-task-creater-modal',
  templateUrl: './task-creater-modal.component.html',
  styleUrls: ['./task-creater-modal.component.scss'],
})
export class TaskCreaterModalComponent implements OnInit {
  taskForm!: FormGroup;

  currentUserId: string = parseJwt(localStorage.getItem('uniq_token') as string);

  dialogTaskData!: ITaskCreaterDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskCreaterDialogData,
    private dialogRef: MatDialogRef<TaskCreaterModalComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
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
    this.dialog.closeAll();
  }
}
