export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardRequest {
  title: string;
  owner: string;
  users: string[];
}

/* export interface IBoardResponse {
  _id: string;
  title: string;
  description: string;
  columns?: IColumn[]
} */

export interface IColumnResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnRequest {
  title: string;
  order: number;
}

export interface IColumnSet {
  _id: string;
  order: number;
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks?: ITask[]
}

export interface ITask {
  _id: string,
  title: string,
  order: number,
  boardId: string,
  columnId: string,
  description: string,
  userId: string,
  users: string[],
}

export interface ITaskRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
  users: string[],
}

export interface ITaskResponse {
  _id: string,
  title: string,
  order: number,
  boardId: string,
  columnId: string,
  description: string,
  userId: string,
  users: string[],
}

export interface ITaskPutRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
  columnId: string,
  users: string[]
}

export interface ITaskPutResponse {
  _id: string,
  title: string,
  order: string,
  boardId: string,
  columnId: string,
  description: string,
  userId: string,
  users: string[],
}

interface IFiles {
  filename: string,
  fileSize: number
}
