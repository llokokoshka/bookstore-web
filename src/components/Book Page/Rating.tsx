import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addOrUpdateRating, getBookRating } from '../../store/thunk';

import starImg from '../../img/Star.png';
import fullStar from '../../img/fullStar.png';
import styled from 'styled-components';

const Rating: React.FC<{ bookId: number; isUserRAte: boolean }> = ({
  bookId,
  isUserRAte,
}) => {
  let fullStars = 0;
  let userRate: number | null = null;
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) =>
    state.booksEntities.books?.find((book) => book.id === bookId)
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
        {isUserRAte ? (
          <div className="rating">
            <img src={fullStar} alt="star"></img>
            <h3 className="rate"> {niceViewOfBookRating || '0.0'}</h3>
          </div>
        ) : null}
      </>
      <div className="rating">
        {isUserRAte ? (
          <>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} onClick={() => handleRating(star)}>
                {userRating && star <= userRating ? (
                  <img src={fullStar} alt="fullStar" />
                ) : (
                  <img src={starImg} alt="star" />
                )}
              </div>
            ))}
            <h3 className="rate"> {userRating || '<- Rate this book'}</h3>
          </>
        ) : (
          <>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} onClick={() => handleRating(star)}>
                {fullStars && star <= fullStars ? (
                  <img src={fullStar} alt="fullStar" />
                ) : (
                  <img src={starImg} alt="star" />
                )}
              </div>
            ))}
            <h3 className="rate"> {niceViewOfBookRating || '0.0'}</h3>
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
  /* column-gap: 40px; */
  max-width: 504px;
  width: 100%;

  .rating {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 15px;
  }

  .rate {
    /* width: 25px; */
    height: 24px;
    top: 561px;
    left: 274px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #b9bac3;
  }
`;
