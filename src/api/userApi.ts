import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';

export async function saveFile(formData: FormData) {
  const response = await axiosInstance.post(ApiPath.files, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Autorization: `Bearer ${localStorage.getItem('access')}`,
      'X-File-Type': 'avatar',
    },
  });
  const uploadedFile = response.data.data.filename;
  return uploadedFile;
}

export async function updateUserData(data: {
  fullName?: string;
  email?: string;
}) {
  const updUser = await axiosInstance.patch(ApiPath.user.me, {
    fullName: data?.fullName,
    email: data?.email,
  });
  return updUser;
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
