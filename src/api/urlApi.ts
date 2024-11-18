import { SetURLSearchParams } from 'react-router-dom';

import { AppDispatch } from '../store';
import { getBooks } from '../store/thunk';

interface IQueryParams {
  dispatch: AppDispatch;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  genres?: string[] | number[] | undefined;
  sortByOption?: string;
  minPriceParam?: string;
  maxPriceParam?: string;
}

export const setQueryParams = async (props: IQueryParams) => {
  const pageNum = props.searchParams.get('page');
  const minPrice = props.searchParams.get('minPrice');
  const maxPrice = props.searchParams.get('maxPrice');
  const sortBy = props.searchParams.get('sortBy');

  const updatedParams: Record<string, string> = {};

  if (pageNum) updatedParams.page = pageNum;
  if (props.genres && props.genres.length > 0)
    updatedParams.genre = props.genres.join(',');
  if (props.minPriceParam) updatedParams.minPrice = props.minPriceParam;
  if (props.maxPriceParam) updatedParams.maxPrice = props.maxPriceParam;
  if (props.sortByOption) updatedParams.sortBy = props.sortByOption;

  props.setSearchParams(updatedParams);
  props.dispatch(
    getBooks({
      pageNum: updatedParams?.page || pageNum || null,
      genres: props.genres?.join(',').toString() || null,
      minPrice: updatedParams?.minPrice || minPrice || null,
      maxPrice: updatedParams?.maxPrice || maxPrice || null,
      sortBy: updatedParams?.sortBy || sortBy || null,
    })
  );
};
