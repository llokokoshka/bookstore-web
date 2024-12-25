import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks';
import starImg from '../../assets/img/Star.png';
import fullStar from '../../assets/img/fullStar.png';
import { addOrUpdateRating } from '../../store/booksEntities/booksEntitiesThunk';

type Props = {
  bookId: number;
  isBookPage: boolean;
  userRate: number | string;
  niceViewOfBookRating?: string;
};
const StarsArray = [1, 2, 3, 4, 5];

const RatingStars: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleRating = async (rate: number) => {
    await dispatch(addOrUpdateRating({ bookId: props.bookId, rate }));
  };

  return (
    <StyledWrapper isuserrate={props.isBookPage ? 'column' : 'row'}>
      <div className="rating__stars">
        {StarsArray.map((star) => (
          <div key={star} onClick={() => handleRating(star)}>
            {props.userRate && star <= Number(props.userRate) ? (
              <img src={fullStar} alt="fullStar" className="star" />
            ) : (
              <img src={starImg} alt="star" className="star" />
            )}
          </div>
        ))}
      </div>
      <div className="rating__value">
        {props.niceViewOfBookRating || props.userRate}
      </div>
    </StyledWrapper>
  );
};

export default RatingStars;

const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isuserrate',
})<{ isuserrate: 'row' | 'column' }>`
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
