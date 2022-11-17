import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IColumn, ITask } from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteTaskDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public column!: IColumn;

  @Input() public task!: ITask;

  public boardId = this.router.snapshot.paramMap.get('id') as string;

  public panelOpenState = false;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private tasksService: TasksService,
  ) { }

  ngOnInit(): void {

  }

  deleteTask(task: ITask) {
    this.dialog.open(ConfirmModalComponent, deleteTaskDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.tasksService.deleteTask(this.column, task);
        }
      });
  }

  openTaskEditor(task: ITask): void {
    this.dialog.open(TaskModalComponent, {
      data: {
        dialogTitle: `Edit ${task.title}`,
        task,
        column: this.column,
      },
    });
  }
}
