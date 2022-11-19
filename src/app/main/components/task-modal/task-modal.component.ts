import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IPoint, ITask } from 'src/app/core/models/board.model';
import { ITaskDialogData } from 'src/app/core/models/modal.model';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public points$!: Observable<IPoint[]>;

  public donePoints$!: Observable<IPoint[]>;

  public task!: ITask;

  public isEditMode: boolean = false;

  public editTitleForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITaskDialogData,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    public dialog: MatDialog,
    private taskService: TasksService,
  ) {
    if (data) {
      this.task = this.data.task;
      this.points$ = this.data.points$;
      this.donePoints$ = this.data.donePoints$;
    }
  }

  ngOnInit(): void {
    this.editTitleForm = new FormGroup({
      title: new FormControl(this.task.title, [
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
      ...this.editTitleForm.value,
    });
  }

  closeTaskModal(): void {
    this.dialog.closeAll();
  }
}
