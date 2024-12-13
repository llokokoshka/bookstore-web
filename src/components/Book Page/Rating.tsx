import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import starImg from '../../img/Star.png';
import fullStar from '../../img/fullStar.png';
import styled from 'styled-components';
import {
  addOrUpdateRating,
  getBookRating,
} from '../../store/booksEntities/booksEntitiesThunk';

const Rating: React.FC<{ bookId: number; isUserRate: boolean }> = ({
  bookId,
  isUserRate,
}) => {
  let fullStars = 0;
  let userRate: number | null = null;
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) =>
    bookId in state.booksEntities.books
      ? state.booksEntities.books[bookId]
      : null
  );

  const bookRating = book?.totalRate;
  let niceViewOfBookRating = `0.0`;
  if (bookRating) {
    fullStars = Math.round(bookRating);
  }
  if (Number.isInteger(bookRating)) {
    niceViewOfBookRating = `${bookRating}.0`;
  } else {
    niceViewOfBookRating = `${bookRating}`;
  }
  const userRates = useAppSelector((state) => state.auth.user?.rating);

  const isUserRateThisBook = userRates?.find(
    (item) => item.book.id === book?.id
  );

  if (isUserRateThisBook) {
    userRate = Number(isUserRateThisBook.value);
  }

  const [userRating, setUserRating] = useState<number | null>(userRate);

  useEffect(() => {
    dispatch(getBookRating(bookId));
  }, [dispatch, bookId]);

  const handleRating = (rate: number) => {
    setUserRating(rate);
    dispatch(addOrUpdateRating({ bookId, rate }));
  };

  return (
    <StyledWrapper>
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
                  {userRating && star <= userRating ? (
                    <img src={fullStar} alt="fullStar" className="star" />
                  ) : (
                    <img src={starImg} alt="star" className="star" />
                  )}
                </div>
              ))}
            </div>
            <h3 className="rating__value">
              {userRating || '<- Rate this book'}
            </h3>
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
            <h3 className="rating__value"> {niceViewOfBookRating || '0.0'}</h3>
          </>
        )}
      </div>
    </StyledWrapper>
  );
};

export default Rating;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 504px;
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
    width: 299px;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 834px) {
      width: 255px;
    }
  }
  .rating__stars {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    @media screen and (max-width: 834px) {
      column-gap: 24px;
    }
  }

  .star {
    width: 26px;
    height: 26px;
    @media screen and (max-width: 834px) {
      width: 20px;
      height: 20px;
    }
  }

  .rating__value {
    height: 24px;
    top: 561px;
    left: 274px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_grey};
  }
`;
