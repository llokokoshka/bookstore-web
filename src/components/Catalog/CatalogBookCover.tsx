import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import heart from '../../assets/img/Heart.png';
import fullHeart from '../../assets/img/fullHeart.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { toggleFavorite } from '../../store/favorites/favoritesThunk';

export interface Props {
  img: string;
  id: number;
  isInFavorites: boolean;
  isBestseller: boolean;
  isNew: boolean;
}

const CatalogBookCover: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const toggleFav = async () => {
    await dispatch(
      toggleFavorite({ bookId: props.id, isInFavorites: props.isInFavorites })
    );
  };

  return (
    <StyledWrapper>
      {props.isInFavorites ? (
        <div className="book__favorite-button" onClick={toggleFav}>
          <img src={fullHeart} alt="fullHeart" className="heart-size"></img>
        </div>
      ) : (
        <div
          className="book__favorite-button book__favorite-button--opacity"
          onClick={toggleFav}
        >
          <img src={heart} alt="heart" className="heart-size"></img>
        </div>
      )}
      {props.isNew ? (
        <div className="book__new">
          <div>New</div>
        </div>
      ) : (
        props.isBestseller && (
          <div className="book__bestseller">
            <div>Bestseller</div>
          </div>
        )
      )}
      <Link to={`${AppPages.getBookIdUrl(props.id)}`}>
        <img src={props.img} alt="img" className="book__cover"></img>
      </Link>
    </StyledWrapper>
  );
};

export default CatalogBookCover;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  ${({ theme }) => theme.media.tablet} {
    max-width: 254px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 135px;
  }

  .book__favorite-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    z-index: 5;

    ${({ theme }) => theme.media.tablet} {
      width: 39px;
      height: 39px;
      top: 16px;
      left: 16px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 25px;
      height: 25px;
      top: 16px;
      left: 19px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .heart-size {
    ${({ theme }) => theme.media.tablet} {
      width: 21px;
      height: 21px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 14px;
      height: 14px;
    }
  }

  .book__cover {
    width: 305px;
    height: 448px;
    border-radius: 16px;

    ${({ theme }) => theme.media.tablet} {
      width: 254px;
      height: 372px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 135px;
      height: 192px;
    }
  }

  .book__favorite-button--opacity {
    opacity: 50%;
    &:hover {
      opacity: 100%;
    }
  }

  .book__new {
    position: absolute;

    width: 132px;
    height: 30px;
    top: 398px;
    left: 20px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.green};

    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 9.5px;
    letter-spacing: 0.75px;
    text-align: center;
    color: #344966;
    z-index: 7;

    ${({ theme }) => theme.media.tablet} {
      top: 320px;
    }

    ${({ theme }) => theme.media.mobile} {
      top: 153px;
      width: 113px;
      left: 12px;
      padding: 10px 0 0 0;
    }
  }

  .book__bestseller {
    position: absolute;
    width: 175px;
    height: 30px;
    top: 398px;
    left: 20px;
    padding: 10px 50px;
    gap: 10px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.dark_blue};

    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 9.5px;
    letter-spacing: 0.75px;
    text-align: center;
    color: white;
    z-index: 7;

    ${({ theme }) => theme.media.tablet} {
      top: 320px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 113px;
      top: 153px;
      left: 12px;
      padding: 10px 0 0 0;
    }
  }
`;
