import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresType } from '../../lib/types';
import { deleteCheckedGenres, setCheckedGenres } from '../../store/filterSlice';

const GenresPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const AllGenres = useAppSelector((state) => state.filters.genres);
  const CheckedGenres = useAppSelector((state) => state.filters.checkedGenres);

  const handleGenreSelect = (genre: GenresType) => {
    const findGenre = CheckedGenres.find((checkG) => checkG.id === genre.id);
    if (!findGenre) {
      dispatch(setCheckedGenres(genre));
    } else {
      dispatch(deleteCheckedGenres(genre));
    }
  };

  return (
    <StyledWrapper>
      {AllGenres.map((genre) => (
        <div key={genre.id}>
          <input
            type="checkbox"
            checked={CheckedGenres.includes(genre)}
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
