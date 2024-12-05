import { axiosInstance } from '../axiosDefaul';
import { ApiPath } from '../constants/textConstants';
import {
  BookType,
  CommentsType,
  IBook,
  IRecommendedThunk,
  RatingResThunkType,
  RatingThunkType,
} from '../lib/types';

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
  const response = await axiosInstance.get<IBook>(searchStr);
  return response.data;
}

export async function getRatingApi(id: number) {
  return axiosInstance
    .get<RatingThunkType>(ApiPath.getBookRatingWithIdUrl(id))
    .then((res) => ({
      bookId: id,
      rate: res.data.rate,
    }));
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
  const rating = await axiosInstance.post<RatingResThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId),
    { rate }
  );
  return rating.data.rating;
}

export async function getAvarageRatingApi(bookId: number) {
  const response = await axiosInstance.get<RatingThunkType>(
    ApiPath.getBookRatingWithIdUrl(bookId)
  );
  return response.data.rate;
}

export async function getRecommendedApi() {
  const response = await axiosInstance.get<IRecommendedThunk>(
    ApiPath.recommended
  );
  return response.data;
}

export async function getSearchedApi() {
  const response = await axiosInstance.get<IRecommendedThunk>(ApiPath.searched);
  return response.data;
}
