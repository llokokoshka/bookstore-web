import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addOrUpdateRating, getBookRating } from '../../store/thunk';

const Rating: React.FC<{ bookId: number; userId: number }> = ({
  bookId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) =>
    state.books.books?.find((book) => book.id === bookId)
  );
  const userBookRating = book?.rates?.rating;
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getBookRating(bookId));
  }, [dispatch, bookId]);

  const handleRating = (value: number) => {
    setUserRating(value);
    dispatch(addOrUpdateRating({ bookId, value }));
  };

  return (
    <div>
      <h3>Average Rating: {userBookRating || 'Not Rated'}</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            style={{ color: userRating === star ? 'gold' : 'gray' }}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
