import { getBooks } from '../store/thunk';
import { IQueryParams } from '../lib/types';

export const setQueryParams = async (props: IQueryParams) => {
  const pageNum = props.searchParams.get('page');
  const minPrice = props.searchParams.get('minPrice');
  const maxPrice = props.searchParams.get('maxPrice');
  const sortBy = props.searchParams.get('sortBy');

  const updatedParams: Record<string, string> = {};

  if (props.pageNum) updatedParams.page = props.pageNum;
  if (props.genres && props.genres.length > 0)
    updatedParams.genre = props.genres.join(',');
  if (props.minPriceParam) updatedParams.minPrice = props.minPriceParam;
  if (props.maxPriceParam) updatedParams.maxPrice = props.maxPriceParam;
  if (props.sortByOption) updatedParams.sortBy = props.sortByOption;

  props.setSearchParams(updatedParams);
  props.dispatch(
    getBooks({
      pageNum: updatedParams?.page || pageNum || '1',
      genres: props.genres?.join(',').toString() || null,
      minPrice: updatedParams?.minPrice || minPrice || null,
      maxPrice: updatedParams?.maxPrice || maxPrice || null,
      sortBy: updatedParams?.sortBy || sortBy || null,
    })
  );
};
