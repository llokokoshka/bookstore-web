import { IQueryParams } from '../lib/types';
import { getCatalog } from '../store/catalog/catalogThunk';
import {
  setCheckedGenres,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSearcheParam,
  setSortBy,
} from '../store/filter/filterSlice';

export const setQueryParams = async (props: IQueryParams) => {
  props.setSearchParams({
    ...Object.fromEntries(props.searchParams.entries()),
  });

  const pageNum = props.searchParams.get('page');
  const minPrice = props.searchParams.get('minPrice');
  const maxPrice = props.searchParams.get('maxPrice');
  const sortBy = props.searchParams.get('sortBy');
  const genres = props.searchParams.getAll('genre');
  const search = props.searchParams.get('search');

  const updatedParams: Record<string, string> = {};

  if (props.pageNum) {
    updatedParams.page = props.pageNum;
  } else if (pageNum) {
    updatedParams.page = pageNum;
    props.dispatch(setPage(Number(pageNum)));
  }

  if (props.genres && props.genres.length !== 0) {
    updatedParams.genre = props.genres.join(',');
  } else if (genres && genres.length !== 0) {
    updatedParams.genre = genres.join(',');
    const newFormOfGenres = genres[0]?.split(',').map(Number);
    for (let genre of newFormOfGenres) {
      props.dispatch(setCheckedGenres(genre));
    }
  }
  if (props.minPriceParam) {
    updatedParams.minPrice = props.minPriceParam;
  } else if (minPrice) {
    updatedParams.minPrice = minPrice;
    props.dispatch(setMinPrice(Number(minPrice)));
  }
  if (props.maxPriceParam) {
    updatedParams.maxPrice = props.maxPriceParam;
  } else if (maxPrice) {
    updatedParams.maxPrice = maxPrice;
    props.dispatch(setMaxPrice(Number(maxPrice)));
  }
  if (props.sortByOption) {
    updatedParams.sortBy = props.sortByOption;
  } else if (sortBy) {
    updatedParams.sortBy = sortBy;
    props.dispatch(setSortBy(sortBy));
  }

  if (props.search) {
    updatedParams.search = props.search;
  } else if (search) {
    updatedParams.search = search;
    props.dispatch(setSearcheParam(search));
  }
  props.setSearchParams(updatedParams);

  props.dispatch(
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
};
