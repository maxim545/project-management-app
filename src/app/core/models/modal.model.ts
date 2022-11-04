export interface IConfirmDialog {
  message: string,
  buttonText: {
    confirm: string,
    cancel: string,
  },
}

export interface IBoardDialog {
  message: string,
  buttonText: {
    confirm: string,
    cancel: string,
  },
  boardId: string,
  boardTitle: string,
  boardDescr: string,
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
