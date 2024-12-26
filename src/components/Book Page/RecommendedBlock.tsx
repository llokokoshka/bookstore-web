import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Recommendations from './Recomendations';

import { getRecommended } from '../../store/recommended/recommendedThunk';

type Props = {
  bookId: number;
};

const RecommendedBlock: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.booksEntities.books);
  const recommendedBooks = useAppSelector(
    (state) => state.recommended.recommended
  );

  const { pathname } = useLocation();
  const [numberOfRecommendedBooks, setNumberOfRecommendedBooks] = useState(4);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getRecommended({ bookId: props.bookId, numberOfRecBooks: 4 }));
    // eslint-disable-next-line
  }, [pathname]);

  const calculateNumberOfBooks = () => {
    const width = window.innerWidth;

    if (width < 790) {
      return 2;
    } else if (width < 1280) {
      return 3;
    } else {
      return 4;
    }
  };

  useEffect(() => {
    const updateNumberOfBooks = () => {
      setNumberOfRecommendedBooks(calculateNumberOfBooks());
    };

    let resizeTimeout: NodeJS.Timeout | null = null;

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          updateNumberOfBooks();
        }, 250);
      }
    }

    window.addEventListener('resize', resizeThrottler, false);

    return () => {
      window.removeEventListener('resize', resizeThrottler, false);
    };
  }, []);

  return (
    <StyledWrapper>
      <div className="big-title">Recommendations</div>
      <div className="recommended__books">
        {recommendedBooks?.map((idBook, idItem) => {
          if (idItem < numberOfRecommendedBooks) {
            return <Recommendations key={idBook} book={books[idBook]} />;
          } else return null;
        })}
      </div>
    </StyledWrapper>
  );
};

export default RecommendedBlock;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding.base};
  row-gap: 50px;
  ${({ theme }) => theme.media.tablet} {
    padding: 0 15px 100px 15px;
  }

  .recommended__books {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 20px;
  }
`;
