import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';
import { IUserResponseData } from '../lib/authTypes';

export async function loginUserApi(email: string, password: string) {
  const response = await axiosInstance.post<IUserResponseData>(ApiPath.login, {
    email,
    password,
  });
  return response.data;
}

export async function regUserApi(email: string, password: string) {
  const response = await axiosInstance.post<IUserResponseData>(
    ApiPath.registration,
    {
      email,
      password,
    }
  );
  return response.data;
}
