import { Observable } from 'rxjs';
import {
  IBoard, IColumn, IFile, IPoint, ITask,
} from './board.model';

export interface IConfirmDialog {
  dialogTitle: string,
  buttonText: {
    confirm: string,
    cancel: string,
  },
}

export interface IBoardDialog {
  dialogTitle: string,
  board: IBoard
}

export interface IColumnDialog {
  dialogTitle: string,
  boardId: string
  columnsQuantity: number
}

export interface ITaskCreaterDialogData {
  dialogTitle: string,
  tasksQuantity: string,
  column: IColumn,
  task: ITask
}

export interface ITaskDialogData {
  task: ITask,
  points$: Observable<IPoint[]>,
  donePoints$: Observable<IPoint[]>,
  files$: Observable<IFile[]>,
}
