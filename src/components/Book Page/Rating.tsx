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

  // if (bookRating) {
  //   fullStars = Math.round(bookRating);
  // }
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
      <div className="rating">
        {isUserRAte ? (
          <>
            <img src={fullStar} alt="star"></img>
            {/* <h3> {bookRating || 'Not Rated'}</h3> */}
          </>
        ) : null}
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
              <h3> {userRating || 'Not Rated'}</h3>
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
              {/* <h3> {bookRating || 'Not Rated'}</h3> */}
            </>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Rating;

const StyledWrapper = styled.div`
  .rating {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 298px;
  }
`;
