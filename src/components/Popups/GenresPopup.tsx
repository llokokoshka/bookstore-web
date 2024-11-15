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
  const CheckedGenresIDs = useAppSelector(
    (state) => state.filters.checkedGenresId
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenreSelect = async (genre: GenresType) => {
    const findGenre = CheckedGenresIDs.find((id) => id === genre.id);
    console.log('find genre >>> ', findGenre);
    console.log('CheckedGenresIDs', CheckedGenresIDs);

    if (!findGenre) {
      dispatch(setCheckedGenres(genre.id));

      const genres = searchParams.getAll('genre');
      console.log('genres: ', genres);

      if (!genres.includes(genre.id.toString())) {
        genres.push(genre.id.toString());

        console.log('Point 1, genres with new item >>>', genres);

        const oldParamsInURL = Object.fromEntries(searchParams.entries());
        const strForParamsWithGenres = genres?.join(',');

        console.log('oldParamsInURL >>> ', oldParamsInURL);

        setSearchParams({
          ...oldParamsInURL,
          genre: strForParamsWithGenres,
        });
      }

      const pageNum = searchParams.get('page');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const sortBy = searchParams.get('sortBy');
      const allGenres = genres?.join(',');

      await dispatch(
        getBooks({
          pageNum: pageNum,
          genres: allGenres,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: sortBy,
        })
      );
    } else {
      dispatch(deleteCheckedGenres(genre.id));

      console.log('after delete ', CheckedGenresIDs);

      const genres = searchParams
        .getAll('genre')[0]
        .split(',')
        .map(Number)
        .filter((g) => g !== genre.id);

      console.log(genres);

      console.log('Point 2, genres delete unchecked param >>>', genres);

      const pageNum = searchParams.get('page');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const sortBy = searchParams.get('sortBy');

      const updatedParams: Record<string, string> = {};

      if (genres.length > 0) updatedParams.genre = genres.join(',');
      if (pageNum) updatedParams.page = pageNum;
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
