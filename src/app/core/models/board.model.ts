export interface IBoardForm {
  title: string;
  description: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
  files: IFiles[]
}

export interface IFiles {
  filename: string,
  fileSize: number
}
