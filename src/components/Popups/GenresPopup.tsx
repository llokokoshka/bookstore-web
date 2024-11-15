import React from 'react';
import styled from 'styled-components';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresType } from '../../lib/types';
import { deleteCheckedGenres, setCheckedGenres } from '../../store/filterSlice';
import { getBooks } from '../../store/thunk';
import { AppDispatch } from '../../store';

const setQueryParams = async (
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

const GenresPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const AllGenres = useAppSelector((state) => state.filters.genres);
  const CheckedGenresIDs = useAppSelector(
    (state) => state.filters.checkedGenresId
  );

  const handleGenreSelect = async (genre: GenresType) => {
    const findGenre = CheckedGenresIDs.find((id) => id === genre.id);

    if (!findGenre) {
      dispatch(setCheckedGenres(genre.id));

      const genres = searchParams.getAll('genre');

      if (!genres.includes(genre.id.toString())) {
        genres.push(genre.id.toString());
      }
      setQueryParams(dispatch, searchParams, setSearchParams, genres);
    } else {
      dispatch(deleteCheckedGenres(genre.id));

      const genres = searchParams
        .getAll('genre')[0]
        .split(',')
        .map(Number)
        .filter((g) => g !== genre.id);

      setQueryParams(dispatch, searchParams, setSearchParams, genres);
    }
  };

  return (
    <StyledWrapper>
      {AllGenres.map((genre) => (
        <div key={genre.id}>
          <input
            type="checkbox"
            checked={CheckedGenresIDs.includes(genre.id)}
            onChange={() => handleGenreSelect(genre)}
          />
          <label>{genre.name}</label>
        </div>
      ))}
    </StyledWrapper>
  );
};

export default GenresPopup;

const StyledWrapper = styled.div`
  position: absolute;
  background: white;
`;
