import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../hooks';
import poligon from '../../assets/img/Polygon 4.png';
import { GenresType } from '../../lib/types';

const GenresPopup: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const AllGenres = useAppSelector((state) => state.genres.genres);
  const CheckedGenresIDs = searchParams.getAll('genre')[0];
  let arrayWithIds: number[] = [];

  if (CheckedGenresIDs) {
    arrayWithIds = CheckedGenresIDs.split(',').map(Number);
  }

  const handleGenreSelect = async (genre: GenresType) => {
    const findGenre = arrayWithIds.find((id) => id === genre.id);

    if (!findGenre) {
      if (!arrayWithIds.includes(genre.id)) {
        arrayWithIds.push(genre.id);
      }
      searchParams.set('genre', arrayWithIds.join(','));

      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
      });
    } else {
      const genres = arrayWithIds.filter((g) => g !== genre.id);

      if (genres.length === 0) {
        searchParams.delete('genre');
      } else {
        searchParams.set('genre', genres.join(','));
      }

      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
      });
    }
  };

  return (
    <StyledWrapper>
      <img src={poligon} alt="aa" className="poligon" />

      {AllGenres.map((genre) => (
        <div key={genre.id} className="genre">
          <input
            className={cn('genre__checkbox', {
              hippen: arrayWithIds.includes(genre.id),
            })}
            type="checkbox"
            checked={arrayWithIds.includes(genre.id)}
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
  height: auto;
  top: 74px;
  row-gap: 10px;
  z-index: 15;
  box-shadow: 5px 5px 15px ${({ theme }) => theme.colors.dark_blue};
  ${({ theme }) => theme.media.mobile} {
    width: 290px;
    z-index: 15;
  }

  .poligon {
    position: absolute;
    left: 11px;
    top: -11px;
    z-index: 15;
  }
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
