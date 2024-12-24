import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

import fullStar from '../../assets/img/fullStar.png';
import { IUserRating } from '../../lib/types';
import RatingStars from './RatingStars';
import { useAppSelector } from '../../hooks';

type Props = {
  bookId: number;
  isBookPage: boolean;
};

const Rating: React.FC<Props> = (props) => {
  let fullStars = 0;
  let niceViewOfBookRating = `0.0`;

  let userRateID: IUserRating | null = null;
  let userRate: number | null | undefined = null;

  const book = useAppSelector(
    (state) => state.booksEntities.books[props.bookId]
  );
  const userRates = useAppSelector((state) => state.auth.user?.rating);

  const bookRating = book.totalRate;

  if (bookRating) {
    fullStars = Math.round(bookRating);
  }

  if (Number.isInteger(bookRating)) {
    niceViewOfBookRating = `${bookRating}.0`;
  } else if (bookRating) {
    niceViewOfBookRating = `${bookRating}`;
  }

  if (userRates) {
    userRateID = userRates[props.bookId];
  }
  if (userRateID) {
    userRate = userRateID.value;
  }

  return (
    <StyledWrapper isuserrate={props.isBookPage ? 'column' : 'row'}>
      <>
        {props.isBookPage && (
          <div className="total-rating">
            <img src={fullStar} alt="star" className="star"></img>
            <h3 className="rating__value"> {niceViewOfBookRating || '0.0'}</h3>
          </div>
        )}
      </>
      {props.isBookPage ? (
        <RatingStars
          bookId={props.bookId}
          isBookPage={true}
          userRate={userRate ? userRate : '<- Rate this book'}
        />
      ) : (
        <RatingStars
          bookId={props.bookId}
          isBookPage={false}
          userRate={fullStars ? fullStars : '0.0'}
          niceViewOfBookRating={
            niceViewOfBookRating ? niceViewOfBookRating : '0.0'
          }
        />
      )}
    </StyledWrapper>
  );
};

export default Rating;

const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isuserrate',
})<{ isuserrate: 'row' | 'column' }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 630px;
  width: 100%;

  @media screen and (max-width: 834px) {
    flex-direction: column;
    align-items: start;
    row-gap: 15px;
  }

  .total-rating {
    display: flex;
    flex-direction: row;
    column-gap: 13px;
  }

  .rating {
    display: flex;
    flex-direction: row;
    max-width: 396px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 834px) {
      width: 255px;
    }
    @media screen and (max-width: 320px) {
      flex-direction: ${({ isuserrate }) => isuserrate};
      align-items: start;
      width: 135px;
    }
  }
  .rating__stars {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    @media screen and (max-width: 834px) {
      column-gap: 24px;
    }
    @media screen and (max-width: 320px) {
      column-gap: 7px;
    }
  }

  .star {
    width: 26px;
    height: 26px;
    @media screen and (max-width: 834px) {
      width: 20px;
      height: 20px;
    }
    @media screen and (max-width: 320px) {
      width: 15px;
      height: 15px;
    }
  }

  .rating__value {
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_grey};
    @media screen and (max-width: 320px) {
      font-size: 13px;
      line-height: 19.5px;
    }
  }
`;
