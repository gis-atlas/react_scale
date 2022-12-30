export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  confirm_password: string;
}

export interface IProfile {
  birthday: string;
  city: string;
  email: string;
  id: string;
  name: string;
  telegram: string;
}

export interface IProfileUpdate {
  firstName: string;
  lastName: string;
  telegram: string;
  city: string;
  birthday: string;
}
