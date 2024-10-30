export interface IFormInput {
  email: string;
  password: string;
  passwordRep: string;
}

export interface IFormReg {
  email: string;
  password: string;
}

export type User = {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
};

export interface AuthState {
  user: User | null;
  error: string | null;
  load: boolean;
}
