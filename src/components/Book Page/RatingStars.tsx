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
        {props.niceViewOfBookRating
          ? props.niceViewOfBookRating
          : props.userRate}
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
  @media screen and (max-width: 834px) {
    width: 255px;
  }
  @media screen and (max-width: 320px) {
    flex-direction: ${({ isuserrate }) => isuserrate};
    align-items: start;
    width: 135px;
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
