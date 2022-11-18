import { IBoard, IColumn, ITask } from './board.model';

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

export interface ITaskDialogData {
  editorMode: string,
  dialogTitle: string,
  tasksQuantity: string,
  column: IColumn,
  task: ITask
}
