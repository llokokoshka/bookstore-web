import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresType } from '../../lib/types';
import { deleteCheckedGenres, setCheckedGenres } from '../../store/filterSlice';
import { getBooks } from '../../store/thunk';

const GenresPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const AllGenres = useAppSelector((state) => state.filters.genres);
  const CheckedGenres = useAppSelector((state) => state.filters.checkedGenres);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenreSelect = async (genre: GenresType) => {
    const findGenre = CheckedGenres.find((checkG) => checkG.id === genre.id);

    if (!findGenre) {
      dispatch(setCheckedGenres(genre));
      const genres = searchParams.getAll('genre');

      if (!genres.includes(genre.id.toString())) {
        genres.push(...genres, genre.id.toString());

        console.log('>>>>>>>> ', Object.fromEntries(searchParams.entries()));
        console.log('new arr with genres >>>>', genres);
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          genre: genres,
        });
      }

      const pageNum = searchParams.get('page');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const sortBy = searchParams.get('sortBy');
      await dispatch(
        getBooks({
          pageNum: pageNum,
          genres: genres,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: sortBy,
        })
      );
    } else {
      dispatch(deleteCheckedGenres(genre));
      const genres = searchParams
        .getAll('genre')
        .filter((g) => g !== genre.id.toString());

      setSearchParams({ genre: genres });

      const pageNum = searchParams.get('page');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const sortBy = searchParams.get('sortBy');
      await dispatch(
        getBooks({
          pageNum: pageNum,
          genres: genres,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: sortBy,
        })
      );
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
