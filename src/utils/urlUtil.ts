type IQueryParams = {
  searchParams: URLSearchParams;
};

export const getSearchParamsObj = (props: IQueryParams) => {
  const updatedParams: Record<string, string> = {};

  const pageNum = props.searchParams.get('page');
  const minPrice = props.searchParams.get('minPrice');
  const maxPrice = props.searchParams.get('maxPrice');
  const sortBy = props.searchParams.get('sortBy');
  const genres = props.searchParams.getAll('genre');
  const search = props.searchParams.get('search');

  if (pageNum) {
    updatedParams.page = pageNum;
  }

  if (genres && genres.length !== 0) {
    updatedParams.genre = genres.join(',');
  }

  if (minPrice) {
    updatedParams.minPrice = minPrice;
  }

  if (maxPrice) {
    updatedParams.maxPrice = maxPrice;
  }

  if (sortBy) {
    updatedParams.sortBy = sortBy;
  }

  if (search) {
    updatedParams.search = search;
    updatedParams.page = '1';
  }

  return updatedParams;
};
