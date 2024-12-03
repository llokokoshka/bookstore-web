import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';
import {
  CartItemType,
  CartType,
  FavoriteItemType,
  FavoriteType,
  IUserResponseData,
} from '../lib/types';

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

export async function getUserApi() {
  const response = await axiosInstance.get<IUserResponseData>(ApiPath.user.me);
  return response.data;
}

export async function getCartApi() {
  const response = await axiosInstance.get<CartType>(
    ApiPath.user.cart.allItems
  );
  return response.data;
}

export async function addCartItemApi(bookId: number) {
  const response = await axiosInstance.post<CartItemType>(
    ApiPath.user.cart.item,
    {
      bookId,
    }
  );

  return response.data;
}

export async function changeAmountItemInCartApi(
  ItemId: number,
  action: boolean
) {
  const response = await axiosInstance.patch(
    ApiPath.user.cart.getItemWithIdUrl(ItemId),
    {
      action,
    }
  );
  return response.data;
}

export async function deteleItemInCartApi(ItemId: number) {
  const response = await axiosInstance.delete(
    ApiPath.user.cart.getItemWithIdUrl(ItemId)
  );
  return response.data;
}

export async function getFavoriteApi() {
  const response = await axiosInstance.get<FavoriteType>(
    ApiPath.user.favorites.allFavorites
  );

  return response.data;
}
export async function addFavoriteItemApi(bookId: number) {
  const response = await axiosInstance.post<FavoriteItemType>(
    ApiPath.user.favorites.item,
    {
      bookId,
    }
  );

  return response.data;
}
export async function deleteFavoriteItemApi(ItemId: number) {
  const response = await axiosInstance.delete(
    ApiPath.user.favorites.getItemWithIdUrl(ItemId)
  );
  return response.data;
}
