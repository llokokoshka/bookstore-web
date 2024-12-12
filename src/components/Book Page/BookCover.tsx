import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ApiPath } from '../../constants/textConstants';
import heart from '../../img/Heart.png';
import fullHeart from '../../img/fullHeart.png';
import { handleFavorites } from '../../utils/favoriteUtil';

interface Props {
  id: number;
  isFav: boolean;
  img: string;
}

const BookCover: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const favorites = useAppSelector((state) => state.favorite.favorites);

  const useHandleFav = async () => {
    await handleFavorites(
      props.id,
      dispatch,
      booksInFavorites,
      favorites,
      props.isFav || false
    );
  };

  return (
    <StyledWrapper>
      <div className="book__cover">
        {props.isFav ? (
          <div className="cover__favorite-button" onClick={useHandleFav}>
            <img src={fullHeart} alt="fullHeart"></img>
          </div>
        ) : (
          <div
            className="cover__favorite-button --opacity"
            onClick={useHandleFav}
          >
            <img src={heart} alt="heart"></img>
          </div>
        )}
        <img
          src={dirnameBookImg + props.img}
          alt="img"
          className="cover__img"
        ></img>
      </div>
    </StyledWrapper>
  );
};

export default BookCover;

const StyledWrapper = styled.div`
  .book__cover {
    position: relative;
  }

  .cover__img {
    width: 522px;
    height: 779px;
    @media screen and (max-width: 834px) {
      width: 391px;
      height: 584px;
    }
  }

  .cover__favorite-button {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    width: 59px;
    height: 59px;
    top: 30px;
    left: 433px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 834px) {
      left: 322px;
    }
  }

  .cover__favorite-button:hover {
    cursor: pointer;
  }

  .--opacity {
    opacity: 50%;
  }

  .--opacity:hover {
    opacity: 100%;
  }
`;
