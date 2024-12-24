import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import heart from '../../assets/img/Heart.png';
import fullHeart from '../../assets/img/fullHeart.png';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../../store/favorites/favoritesThunk';

type Props = {
  id: number;
  isFav: boolean;
  img: string;
};

const BookCover: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const toggleFav = async () => {
    if (!user) {
      navigate(`${AppPages.login}`);
    }
    await dispatch(
      toggleFavorite({ bookId: props.id, isInFavorites: props.isFav })
    );
  };

  return (
    <StyledWrapper>
      {props.isFav ? (
        <div className="cover__favorite-button" onClick={toggleFav}>
          <img src={fullHeart} alt="fullHeart" className="heart-size"></img>
        </div>
      ) : (
        <div
          className="cover__favorite-button cover__favorite-button--opacity"
          onClick={toggleFav}
        >
          <img src={heart} alt="heart" className="heart-size"></img>
        </div>
      )}
      <img src={props.img} alt="img" className="cover__img"></img>
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
