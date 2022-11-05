export interface IBoardForm {
  title: string;
  description: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardBybId {
  id: string;
  title: string;
  description: string;
  columns?: IColumn[]
}

export interface IColumnResponse {
  id: string;
  title: string;
  order: number;
}

export interface IColumnPostRequest {
  title: string;
}

export interface IColumnPutRequest {
  title: string;
  order: number;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[]
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
  files?: IFiles[]
}

export interface ITaskRequest {
  title: string,
  description: string,
  userId: string,
}

export interface ITaskResponse {
  id: string,
  title: string,
  description: string,
  userId: string,
}

export interface ITaskPutRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

export interface ITaskPutResponse {
  id: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

interface IFiles {
  filename: string,
  fileSize: number
}
