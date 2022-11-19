export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface ISelectUser {
  _id: string;
  name: string;
  login: string;
  checked: boolean;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUserRequest {
  name: string;
  login: string;
  password: string;
}

/* export interface IUserData {
  _id: string;
  name: string;
  login: string;
  password: string;
} */

export interface IUserToken {
  token: string;
}
