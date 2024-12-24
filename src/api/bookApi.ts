import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';

import {
  BookType,
  CommentsType,
  GenresType,
  ICatalogFromServer,
  IRecommendedThunk,
  IUserRating,
} from '../lib/types';
import { RatingThunkType } from '../store/booksEntities/bookTypes';

export async function getBookRatingApi(bookId: number) {
  const response = await axiosInstance.get<RatingThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId)
  );
  return response.data;
}

export async function getBookByIdApi(bookId: number) {
  let response = await axiosInstance.get<{
    book: BookType;
    totalRate: number;
  }>(ApiPath.getBookByIdWithIdUrl(bookId));
  response.data.book.totalRate = response.data.totalRate;
  return response.data.book;
}

export async function getCatalogApi(searchStr: string) {
  const response = await axiosInstance.get<ICatalogFromServer>(searchStr);
  return response.data;
}

export async function getRatingApi(id: number) {
  const response = await axiosInstance
    .get<RatingThunkType>(ApiPath.getBookRatingWithIdUrl(id))
    .then((res) => ({
      bookId: id,
      rate: res.data.rate,
    }));
  return response;
}

export async function addCommentApi(bookId: number, text: string) {
  const response = await axiosInstance.post<CommentsType>(
    ApiPath.getBookCommentWithIdUrl(bookId),
    {
      text,
    }
  );
  return response.data;
}

export async function getAllCommentsApi(bookId: number) {
  const response = await axiosInstance.get<CommentsType[]>(
    ApiPath.getBookCommentWithIdUrl(bookId)
  );
  return response.data;
}

export async function addRateApi(bookId: number, rate: number) {
  const rating = await axiosInstance.post<IUserRating>(
    ApiPath.getBookRatingWithIdUrl(bookId),
    { rate }
  );
  return rating.data;
}

export async function getAvarageRatingApi(bookId: number) {
  const response = await axiosInstance.get<RatingThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId)
  );
  return response.data.rate;
}

export async function getRecommendedApi(bookId: number) {
  const response = await axiosInstance.get<IRecommendedThunk>(
    ApiPath.getRecommendedWithIdUrl(bookId)
  );
  return response.data;
}

export async function getGenresApi() {
  const response = await axiosInstance.get<GenresType[]>(ApiPath.genres);
  return response.data;
}
