import { IBoard } from './board.model';

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

export interface ITaskDialog {
  dialogTitle: string,
  boardId: string,
  columnId: string,
  taskTitle: string,
  taskDescr: string,
  taskId: string,
  order: number,
}
