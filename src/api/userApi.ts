import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';
import { UserType, IUserResponseData } from '../lib/authTypes';
import { CartType, CartItemType } from '../lib/cartTypes';
import { FavoriteType } from '../lib/favoriteTypes';

export async function saveBase64File(
  base64Data: string,
  fileType: string
): Promise<string> {
  const response = await axiosInstance.post(
    ApiPath.files,
    { base64Data, fileType },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }
  );
  return response.data.data.filename;
}

export async function updateUserData(data: {
  fullName?: string;
  email?: string;
}) {
  try {
    const updUser = await axiosInstance.patch<UserType>(ApiPath.user.me, {
      fullName: data?.fullName,
      email: data?.email,
    });
    return updUser.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserPassword(data: {
  password: string;
  passwordNew: string;
  passwordRep: string;
}) {
  try {
    const updUser = await axiosInstance.patch(ApiPath.user.userPass, {
      password: data.password,
      passwordNew: data.passwordNew,
    });
    return updUser;
  } catch (err) {
    console.error(err);
  }
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
  const response = await axiosInstance.patch<CartItemType>(
    ApiPath.user.cart.getItemWithIdUrl(ItemId),
    { action }
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
  const response = await axiosInstance.post<FavoriteType>(
    ApiPath.user.favorites.item,
    {
      bookId,
    }
  );
  return response.data;
}

export async function deleteFavoriteItemApi(bookId: number) {
  const response = await axiosInstance.delete<FavoriteType>(
    ApiPath.user.favorites.getItemWithIdUrl(bookId)
  );
  return response.data;
}
