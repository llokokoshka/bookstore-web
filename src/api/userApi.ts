import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { axiosInstance } from '../axiosDefaul';
import { setUser } from '../store/authSlice';
import { ApiPath } from '../constants/textConstants';

export async function saveFile(
  formData: FormData,
  dispatch: Dispatch<UnknownAction>
) {
  const response = await axiosInstance.post(ApiPath.files, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Autorization: `Bearer ${localStorage.getItem('access')}`,
      'X-File-Type': 'avatar',
    },
  });
  const uploadedFile = response.data.data.filename;
  dispatch(setUser({ avatar: uploadedFile }));
}

export async function updateUserData(
  data: {
    fullName?: string;
    email?: string;
  },
  dispatch: Dispatch<UnknownAction>
) {
  const updUser = await axiosInstance.patch(ApiPath.user.me, {
    fullName: data?.fullName,
    email: data?.email,
  });
  dispatch( ///убрать
    setUser({
      fullName: updUser.data?.fullName,
      email: updUser.data?.email,
    })
  );
}

export async function updateUserPassword(data: {
  password: string;
  passwordNew: string;
  passwordRep: string;
}) {
  await axiosInstance.patch(ApiPath.user.userPass, {
    password: data.password,
    passwordNew: data.passwordNew,
  });
}
