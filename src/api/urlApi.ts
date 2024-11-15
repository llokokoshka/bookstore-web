import { SetURLSearchParams } from 'react-router-dom';

import { AppDispatch } from '../store';
import { getBooks } from '../store/thunk';

export const setQueryParams = async (
  dispatch: AppDispatch,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  genres: string[] | number[]
) => {
  const pageNum = searchParams.get('page');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortBy = searchParams.get('sortBy');

  const updatedParams: Record<string, string> = {};

  if (pageNum) updatedParams.page = pageNum;
  if (genres.length > 0) updatedParams.genre = genres.join(',');
  if (minPrice) updatedParams.minPrice = minPrice;
  if (maxPrice) updatedParams.maxPrice = maxPrice;
  if (sortBy) updatedParams.sortBy = sortBy;

  setSearchParams(updatedParams);

  await dispatch(
    getBooks({
      pageNum: pageNum || null,
      genres: genres.join(',').toString() || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      sortBy: sortBy || null,
    })
  );
};
