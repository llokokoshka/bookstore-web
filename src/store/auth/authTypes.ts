import { UserType } from '../../lib/types';

export interface IAuthState {
  user: UserType | null;
  error: string | null;
  loading: boolean;
}

export interface IUserResponseData {
  access_token: string;
  refresh_token: string;
  user: UserType;
}

export interface IFormReg {
  email: string;
  password: string;
}
