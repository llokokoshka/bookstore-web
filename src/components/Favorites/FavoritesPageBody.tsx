import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import BookInFavorite from './BookInFavorite';

const FavoritePageBody: React.FC = () => {
  const Favorites = useAppSelector((state) => state.favorite.favorites);

  return (
    <StyledWrapper>
      {Favorites?.favoritesItems?.map((item) => {
        return <BookInFavorite key={item.id} id={item.id} book={item.book} />;
      })}
    </StyledWrapper>
  );
};

export default FavoritePageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
