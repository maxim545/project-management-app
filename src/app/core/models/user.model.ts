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

export interface IUserToken {
  token: string;
}
