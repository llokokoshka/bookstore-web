import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ApiPath } from '../../constants/textConstants';
import heart from '../../assets/img/Heart.png';
import fullHeart from '../../assets/img/fullHeart.png';
import { handleFavorites } from '../../utils/favoriteUtil';
import { IBookCoverProps } from '../../lib/types';

const BookCover: React.FC<IBookCoverProps> = (props) => {
  const dispatch = useAppDispatch();
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.booksIdsInFavorites
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
      {props.isFav ? (
        <div className="cover__favorite-button" onClick={useHandleFav}>
          <img src={fullHeart} alt="fullHeart" className="heart-size"></img>
        </div>
      ) : (
        <div
          className="cover__favorite-button cover__favorite-button--opacity"
          onClick={useHandleFav}
        >
          <img src={heart} alt="heart" className="heart-size"></img>
        </div>
      )}
      <img
        src={dirnameBookImg + props.img}
        alt="img"
        className="cover__img"
      ></img>
    </StyledWrapper>
  );
};

export default BookCover;

const StyledWrapper = styled.div`
  position: relative;

  .cover__img {
    width: 522px;
    height: 779px;

    border-radius: 16px;
    @media screen and (max-width: 834px) {
      width: 391px;
      height: 584px;
    }
    @media screen and (max-width: 320px) {
      width: 135px;
      height: 202px;
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
      width: 39px;
      height: 39px;
      left: 322px;
      top: 16px;
    }
    @media screen and (max-width: 320px) {
      width: 25px;
      height: 25px;
      top: 16px;
      left: 100px;
    }
  }
  .heart-size {
    @media screen and (max-width: 834px) {
      width: 21px;
      height: 21px;
    }
    @media screen and (max-width: 320px) {
      width: 14px;
      height: 14px;
    }
  }

  .cover__favorite-button:hover {
    cursor: pointer;
  }

  .cover__favorite-button--opacity {
    opacity: 50%;
  }

  .cover__favorite-button--opacity:hover {
    opacity: 100%;
  }
`;
