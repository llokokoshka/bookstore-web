import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteCheckedGenres,
  setCheckedGenres,
} from '../../store/filter/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';
import { GenresType } from '../../lib/bookTypes';

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
      if (genres.length === 0) {
        searchParams.delete('genre');
      }
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
        <div key={genre.id} className="genre">
          <input
            className={cn('genre__checkbox', {
              hippen: CheckedGenresIDs.includes(genre.id),
            })}
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
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 15px;
  border-radius: 16px;
  width: 305px;
  height: 740px;
  top: 74px;
  row-gap: 10px;
  z-index: 10;

  .genre {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    color: ${({ theme }) => theme.colors.dark_blue};
  }

  .genre__checkbox {
    appearance: none;
    -webkit-appearance: none;
    display: flex;
    opacity: 1;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border: ${({ theme }) => theme.border.blue};
    background-color: white;
    cursor: pointer;
  }

  .genre__checkbox:checked {
    background-color: ${({ theme }) => theme.colors.dark_blue};
  }

  .genre__checkbox:checked::after {
    content: '✔';
    position: absolute;
    transform: scale(1);
    color: white;
  }
`;
