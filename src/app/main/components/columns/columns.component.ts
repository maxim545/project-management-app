import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import {
  IColumn, IColumnRequest, IColumnSet, ITask, ITaskSet,
} from 'src/app/core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteColumnDialogConfig, deleteTaskDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { ColumnModalComponent } from 'src/app/shared/components/modals/column-modal/column-modal.component';
import { Store } from '@ngrx/store';
import {
  map, switchMap, Observable, finalize,
} from 'rxjs';
import {
  CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule,
} from '@angular/cdk/drag-drop';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ColumnsService } from '../../services/columns/columns.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit, OnDestroy {
  @Input() public columns!: IColumn[] | null;

  @Input() public boardId!: string;

  public editTitleForm!: FormGroup;

  public isEditMode: boolean = false;

  /* public test1!: IColumn;

  public test2!: ITask[]; */

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private columnsService: ColumnsService,
    private tasksService: TasksService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    /* window.addEventListener('beforeunload', () => {
      this.tasksService.editSetTasks(this.test1, this.test2);
    }); */
  }

  ngOnDestroy(): void {
    /*  this.tasksService.editSetTasks(this.test1, this.test2); */
  }

  /*  openColumnCreater() {
    if (this.columns) {
      this.dialog.open(ColumnModalComponent, {
        data: {
          dialogTitle: 'Create new column',
          boardId: this.boardId,
        },
      });
    }
  } */

  openTaskCreater(column: IColumn) {
    this.dialog.open(TaskModalComponent, {
      data: {
        dialogTitle: 'Create new task',
        boardId: this.boardId,
        column,
      },
    });
  }

  dropColumn(event: CdkDragDrop<IColumn[]>, columns: IColumn[] | null): void {
    if (columns && event.previousIndex !== event.currentIndex) {
      /* const previousColumn = columns[event.previousIndex];
      const currentColumn = columns[event.currentIndex];
      console.log(previousColumn.title, currentColumn.title);
      console.log(event.previousIndex, event.currentIndex); */
      moveItemInArray(columns, event.previousIndex, event.currentIndex);
      columns.forEach((column, i) => column.order = i);
      this.columnsService.editSetColumns(columns);
    }
  }

  dropTask(event: CdkDragDrop<ITask[]>, columns: IColumn[], currentColumn: IColumn) {
    const currentTask = event.previousContainer.data[event.previousIndex];
    let prevColumnIndex: number | null = null;
    columns.forEach((column, i) => {
      const taskIsExist = column.tasks.includes(currentTask);
      if (taskIsExist) { prevColumnIndex = i; }
    });
    if (typeof prevColumnIndex === 'number') {
      if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        /* this.test1 = columns[prevColumnIndex];
        this.test2 = event.container.data; */

        this.tasksService.editSetTasks(columns[prevColumnIndex], event.container.data);
      } else if (event.previousContainer !== event.container) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        const previousColumn = columns[prevColumnIndex];
        previousColumn.tasks.forEach((task, i) => {
          task.order = i;
          task.columnId = previousColumn._id;
        });
        currentColumn.tasks.forEach((task, i) => {
          task.order = i;
          task.columnId = currentColumn._id;
        });
        this.tasksService.editTasksBetweenColumns([previousColumn, currentColumn], previousColumn.tasks, currentColumn.tasks);
      }
    }
  }
}
