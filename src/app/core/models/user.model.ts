export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ISignUpRequest {
  name: string;
  login: string;
  password: string;
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
