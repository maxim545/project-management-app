export interface IUserRegister {
  name: string;
  login: string;
  password: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUserData {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IUserToken {
  token: string;
}
