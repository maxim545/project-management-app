import {
  CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule,
} from '@angular/cdk/drag-drop';
import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { TaskState } from 'src/app/core/store/reducers/tasks.reducers';
import { getAllTasks } from 'src/app/core/store/selectors/tasks.selectors';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteColumnDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { TaskCreaterModalComponent } from 'src/app/main/components/task-creater-modal/task-creater-modal.component';
import { ColumnsService } from '../../services/columns/columns.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input() column!: IColumn;

  @Input() boardId: string = '';

  @Input() board: IBoard | null = null;

  tasks$: Observable<ITask[]>;

  isEditMode: boolean = false;

  editTitleForm!: FormGroup;

  dialog$: Subscription | null = null;

  constructor(
    private taskStore: Store<TaskState>,
    private tasksService: TasksService,
    private columnsService: ColumnsService,
    private dialog: MatDialog,

  ) {
    this.tasks$ = this.taskStore.pipe(
      select(getAllTasks),
      map((tasks) => tasks.filter((task) => task.columnId === this.column._id)),
    );
  }

  ngOnInit(): void {
    this.editTitleForm = new FormGroup({
      title: new FormControl(this.column?.title, [
        Validators.required,
        Validators.maxLength(18),
      ]),
    });
    /* const dataForUpdate = localStorage.getItem('iniq_tasks');
    if (dataForUpdate) {
      const [column, tasksForUpdate] = JSON.parse(dataForUpdate);
      this.tasksService.editSetTasks(column, tasksForUpdate);
      localStorage.removeItem('iniq_tasks');
    } */
  }

  ngOnDestroy() {
    if (this.dialog$) {
      this.dialog$.unsubscribe();
    }
  }

  dropTask(event: CdkDragDrop<ITask[]>, column: IColumn) {
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      /* const savedData = [previousColumn, event.container.data];
      localStorage.setItem('iniq_tasks', JSON.stringify(savedData)); */
      this.tasksService.editSetTasks(event.container.data);
    } else if (event.previousContainer !== event.container) {
      const [previousTask] = event.previousContainer.data; // Need to get column id for previous task
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.tasksService.editTasksBetweenColumns(
        event.previousContainer.data,
        event.container.data,
        previousTask.columnId,
        column._id,
      );
    }
  }

  get f() {
    return this.editTitleForm.controls;
  }

  openTaskCreater(column: IColumn, tasksQuantity: number) {
    this.dialog.open(TaskCreaterModalComponent, {
      data: {
        editorMode: 'columHeader.vadding',
        dialogTitle: 'columHeader.createNewTask',
        boardId: this.boardId,
        tasksQuantity,
        column,
        task: {
          title: '',
          description: '',
        },
      },
    });
  }

  editTitle(column: IColumn) {
    if (column.title !== this.editTitleForm.value.title) {
      this.columnsService.editColumn(this.boardId, {
        ...column,
        title: this.editTitleForm.value.title,
      });
    }
  }

  deleteColumn(column: IColumn) {
    this.dialog$ = this.dialog
      .open(ConfirmModalComponent, deleteColumnDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed && this.boardId) {
          this.columnsService.deleteColumn(this.boardId, column._id);
        }
      });
  }
}
