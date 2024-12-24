import { ERROR_GET_BOOKS_DATA } from '../constants/errorConstants';
import { IQueryParams } from '../lib/types';
import { getCatalog } from '../store/catalog/catalogThunk';

export const setQueryParams = async (props: IQueryParams) => {
  props.setSearchParams(
    {
      ...Object.fromEntries(props.searchParams.entries()),
    },
    { replace: true }
  );

  const updatedParams: Record<string, string> = {};

  const pageNum = props.searchParams.get('page');
  const minPrice = props.searchParams.get('minPrice');
  const maxPrice = props.searchParams.get('maxPrice');
  const sortBy = props.searchParams.get('sortBy');
  const genres = props.searchParams.getAll('genre');
  const search = props.searchParams.get('search');

  if (props.pageNum) {
    updatedParams.page = props.pageNum;
  } else if (pageNum) {
    updatedParams.page = pageNum;
  }

  if (props.genres && props.genres.length !== 0) {
    updatedParams.genre = props.genres.join(',');
  } else if (genres && genres.length !== 0) {
    updatedParams.genre = genres.join(',');
  }

  if (props.minPriceParam) {
    updatedParams.minPrice = props.minPriceParam;
  } else if (minPrice) {
    updatedParams.minPrice = minPrice;
  }

  if (props.maxPriceParam) {
    updatedParams.maxPrice = props.maxPriceParam;
  } else if (maxPrice) {
    updatedParams.maxPrice = maxPrice;
  }

  if (props.sortByOption) {
    updatedParams.sortBy = props.sortByOption;
  } else if (sortBy) {
    updatedParams.sortBy = sortBy;
  }

  if (props.search) {
    updatedParams.search = props.search;
    updatedParams.page = '1';
  } else if (search) {
    updatedParams.search = search;
    updatedParams.page = '1';
  }

  props.setSearchParams(updatedParams, { replace: true });

  try {
    await props.dispatch(
      getCatalog({
        pageNum: updatedParams?.page || pageNum || '1',
        genres:
          props.genres?.join(',').toString() ||
          genres.join(',').toString() ||
          null,
        minPrice: updatedParams?.minPrice || minPrice || null,
        maxPrice: updatedParams?.maxPrice || maxPrice || null,
        sortBy: updatedParams?.sortBy || sortBy || null,
        search: updatedParams?.search || search || null,
      })
    );
  } catch (error) {
    console.error(ERROR_GET_BOOKS_DATA, error);
  }
};
