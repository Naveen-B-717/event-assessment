export interface UserState {
  email: string;
  password: string;
}
export interface IRegisterUser {
  email: string;
  password: string;
  name: string;
}
export interface Error {
  email: boolean;
  password: boolean;
  login: boolean;
}
export interface IRegisterError {
  email: boolean;
  password: boolean;
  name: boolean;
  register: boolean;
}

export class User implements UserState {
  email: string;
  password: string;
  constructor(data: any = {}) {
    this.email = data.email || "";
    this.password = data.password || "";
  }
}
export class RegisterUser implements IRegisterUser {
  email: string;
  password: string;
  name: string;
  constructor(data: any = {}) {
    this.email = data.email || "";
    this.password = data.password || "";
    this.name = data.name || "";
  }
}

export class UserError implements Error {
  email: boolean;
  password: boolean;
  login: boolean;
  constructor(data: any = {}) {
    this.email = data.email || false;
    this.password = data.password || false;
    this.login = data.login || false;
  }
}

export class RegisterError implements IRegisterError {
  email: boolean;
  password: boolean;
  name: boolean;
  register: boolean;
  constructor(data: any = {}) {
    this.email = data.email || false;
    this.password = data.password || false;
    this.name = data.name || false;
    this.register = data.register || false;
  }
}
