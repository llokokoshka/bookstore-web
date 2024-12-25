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
            <h3 className="rating__value"> {niceViewOfBookRating}</h3>
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
          niceViewOfBookRating={niceViewOfBookRating}
        />
      )}
    </StyledWrapper>
  );
};

export default Rating;

const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isuserrate',
})<{ isuserrate: 'row' | 'column' }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 630px;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
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
    ${({ theme }) => theme.media.tablet} {
      width: 255px;
    }
    ${({ theme }) => theme.media.mobile} {
      flex-direction: ${({ isuserrate }) => isuserrate};
      align-items: start;
      width: 135px;
    }
  }
  .rating__stars {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    ${({ theme }) => theme.media.tablet} {
      column-gap: 24px;
    }
    ${({ theme }) => theme.media.mobile} {
      column-gap: 7px;
    }
  }

  .star {
    width: 26px;
    height: 26px;
    ${({ theme }) => theme.media.tablet} {
      width: 20px;
      height: 20px;
    }
    ${({ theme }) => theme.media.mobile} {
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
    ${({ theme }) => theme.media.mobile} {
      font-size: 13px;
      line-height: 19.5px;
    }
  }
`;
