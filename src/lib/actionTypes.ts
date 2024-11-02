export interface IFormInput {
  email: string;
  password: string;
  passwordRep: string;
}

export interface IFormReg {
  email: string;
  password: string;
}

export interface IFormInfo {
  fullName: string;
  email: string;
}

export interface IFormPass {
  password: string;
  passwordNew: string;
  passwordRep: string;
}

export type User = {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  passwordNew?: string;
  avatar?: string;
};

export interface AuthState {
  user: User | null;
  error: string | null;
  load: boolean;
}

export type Props = {
  img: string;
  typeP: string;
  inpReg: any;
  value: string | undefined;
  errors: any;
  isChangedInfo: boolean;
  isChangedPass: boolean;
};
