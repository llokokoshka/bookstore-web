import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import starImg from '../../assets/img/Star.png';
import fullStar from '../../assets/img/fullStar.png';
import { addOrUpdateRating } from '../../store/booksEntities/booksEntitiesThunk';
import { IUserRating } from '../../lib/types';

type Props = {
  bookId: number;
  isUserRate: boolean;
};

const Rating: React.FC<Props> = ({ bookId, isUserRate }) => {
  let fullStars = 0;
  let userRateID: IUserRating | null = null;
  let userRate: number | null | undefined = null;

  const dispatch = useAppDispatch();

  const book = useAppSelector((state) =>
    state.booksEntities.books[bookId] ? state.booksEntities.books[bookId] : null
  );

  const bookRating = book?.totalRate;
  let niceViewOfBookRating = `0.0`;

  if (bookRating) {
    fullStars = Math.round(bookRating);
  }

  if (Number.isInteger(bookRating)) {
    niceViewOfBookRating = `${bookRating}.0`;
  } else if (bookRating) {
    niceViewOfBookRating = `${bookRating}`;
  }

  const userRates = useAppSelector((state) => state.auth.user?.rating);
  if (userRates) {
    userRateID = userRates[bookId];
  }
  if (userRateID) {
    userRate = userRateID.value;
  }

  const handleRating = async (rate: number) => {
    await dispatch(addOrUpdateRating({ bookId, rate }));
  };

  return (
    <StyledWrapper isuserrate={isUserRate ? 'column' : 'row'}>
      <>
        {isUserRate ? (
          <div className="total-rating">
            <img src={fullStar} alt="star" className="star"></img>
            <h3 className="rating__value"> {niceViewOfBookRating || '0.0'}</h3>
          </div>
        ) : null}
      </>
      <div className="rating">
        {isUserRate ? (
          <>
            <div className="rating__stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} onClick={() => handleRating(star)}>
                  {userRate && star <= userRate ? (
                    <img src={fullStar} alt="fullStar" className="star" />
                  ) : (
                    <img src={starImg} alt="star" className="star" />
                  )}
                </div>
              ))}
            </div>
            <div className="rating__value">
              {userRate || '<- Rate this book'}
            </div>
          </>
        ) : (
          <>
            <div className="rating__stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} onClick={() => handleRating(star)}>
                  {fullStars && star <= fullStars ? (
                    <img src={fullStar} alt="fullStar" className="star" />
                  ) : (
                    <img src={starImg} alt="star" className="star" />
                  )}
                </div>
              ))}
            </div>
            <div className="rating__value">{niceViewOfBookRating || '0.0'}</div>
          </>
        )}
      </div>
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
    /* top: 561px;
    left: 274px; */
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
