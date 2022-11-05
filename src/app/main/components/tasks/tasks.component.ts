import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IColumn, ITask } from 'src/app/core/models/board.model';
import { getCurrentColumn, loadTasks } from 'src/app/core/store/actions/columns.actions';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteTaskDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public columns$!: Observable<IColumn[]>;

  @Input() public columnId!: string;

  public boardId = this.router.snapshot.paramMap.get('id') as string;

  public tasks$!: Observable<ITask[] | undefined>;

  constructor(
    private store: Store,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private tasksService: TasksService,
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.columns$.pipe(
      map((columns) => {
        const currentBoard = columns.find((column) => column.id === this.columnId) || null;
        if (currentBoard) {
          return currentBoard.tasks;
        }
        return undefined;
      }),
    );
  }

  deleteTask(taskId: string) {
    this.dialog.open(ConfirmModalComponent, deleteTaskDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.tasksService.deleteTask(this.boardId, this.columnId, taskId);
        }
      });
  }

  openTaskCreater() {
    this.dialog.open(TaskModalComponent, {
      data: {
        dialogTitle: 'Create new task',
        boardId: this.boardId,
        columnId: this.columnId,
      },
    });
  }

  openTaskEditor(taskTitle: string, taskDescr: string, taskId: string, order: number): void {
    this.dialog.open(TaskModalComponent, {
      data: {
        dialogTitle: `Edit ${taskTitle}`,
        boardId: this.boardId,
        columnId: this.columnId,
        taskTitle,
        taskDescr,
        taskId,
        order,
      },
    });
  }
}
