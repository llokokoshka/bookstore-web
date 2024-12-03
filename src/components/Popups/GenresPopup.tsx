import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresType } from '../../lib/types';
import { deleteCheckedGenres, setCheckedGenres } from '../../store/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';

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
      setQueryParams({
        dispatch: dispatch,
        searchParams: searchParams,
        setSearchParams: setSearchParams,
        genres: genres,
      });
    } else {
      dispatch(deleteCheckedGenres(genre.id));

      const genres = searchParams
        .getAll('genre')[0]
        .split(',')
        .map(Number)
        .filter((g) => g !== genre.id);

      setQueryParams({
        dispatch: dispatch,
        searchParams: searchParams,
        setSearchParams: setSearchParams,
        genres: genres,
      });
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
          <label className="base-text">{genre.name}</label>
        </div>
      ))}
    </StyledWrapper>
  );
};

export default GenresPopup;

const StyledWrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 15px;
  border-radius: 16px;
  width: 305px;
  height: 740px;
  top: 74px;
  gap: 0px;
  opacity: 0px;
  z-index: 10;
`;
