import { Component, Input, OnInit } from '@angular/core';
import { IBoardBybId, IColumn, ITask } from 'src/app/core/models/board.model';
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
import { getCurrentBoards } from 'src/app/core/store/selectors/boards.selectors';
import {
  CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule,
} from '@angular/cdk/drag-drop';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { ColumnsService } from '../../services/columns/columns.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  @Input() public columns!: IColumn[] | null;

  @Input() public boardId!: string;

  public editTitleForm!: FormGroup;

  public isEditMode: boolean = false;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private columnsService: ColumnsService,
    private tasksService: TasksService,
  ) { }

  ngOnInit(): void {

  }

  dropColumn(event: CdkDragDrop<IColumn[]>, columns: IColumn[] | null): void {
    if (columns && event.previousIndex !== event.currentIndex) {
      this.columnsService.editColumn(
        this.boardId,
        columns[event.previousIndex].id,
        {
          title: columns[event.previousIndex].title,
          order: columns[event.currentIndex].order,
        },
      );
      moveItemInArray(columns, event.previousIndex, event.currentIndex);
    }
  }

  dropTask(event: CdkDragDrop<ITask[] | undefined>, columns: IColumn[] | null, newColumnId: string) {
    if (event.previousContainer.data && event.container.data && columns) { // Here we define column id in which the current task was
      const currentTask = event.previousContainer.data[event.previousIndex];
      let previousColumnId = '';
      columns?.forEach((column, i) => {
        const taskIsExist = column.tasks?.includes(currentTask);
        if (taskIsExist) { previousColumnId = columns[i].id; }
      });
      if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) { // If we swap tasks in the same column
        console.log(event.previousIndex, event.currentIndex);
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.tasksService.editTask(this.boardId, previousColumnId, currentTask.id, {
          title: currentTask.title,
          order: columns[event.currentIndex].order,
          description: currentTask.description,
          userId: currentTask.userId,
          boardId: this.boardId,
          columnId: previousColumnId,
        });
      } else if (event.previousContainer !== event.container) { // Else we swap tasks from one column to another
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.tasksService.editTask(this.boardId, previousColumnId, currentTask.id, {
          title: currentTask.title,
          order: columns[event.currentIndex].order,
          description: currentTask.description,
          userId: currentTask.userId,
          boardId: this.boardId,
          columnId: newColumnId,
        });
      }
    }
  }

  openColumnCreater() {
    this.dialog.open(ColumnModalComponent, {
      data: {
        dialogTitle: 'Create new column',
        boardId: this.boardId,
      },
    });
  }

  openTaskCreater(columnId: string) {
    this.dialog.open(TaskModalComponent, {
      data: {
        dialogTitle: 'Create new task',
        boardId: this.boardId,
        columnId,
      },
    });
  }
}
