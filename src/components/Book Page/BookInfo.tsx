import React from 'react';
import styled from 'styled-components';

import BookDescription from './BookDescription';
import BookButton from './BookButton';
import { IBookInfoProps } from '../../lib/types';

const BookInfo: React.FC<IBookInfoProps> = (props) => {
  return (
    <StyledWrapper>
      <BookDescription description={props.description} />
      <div className="info-block__buttons">
        <BookButton
          type="Paperback"
          amount={props.cover.paperback_amount}
          price={props.cover.paperback_price}
        />
        <BookButton
          type="Hardcover"
          amount={props.cover.hardcover_amount}
          price={props.cover.hardcover_price}
        />
      </div>
    </StyledWrapper>
  );
};

export default BookInfo;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  row-gap: 30px;
  max-width: 630px;
  width: 100%;
  height: auto;
  @media screen and (max-width: 834px) {
    max-width: 392px;
  }
  @media screen and (max-width: 320px) {
    width: 290px;
    margin-left: -155px;
  }

  .info-block__buttons {
    display: flex;
    flex-direction: row;
    max-width: 541px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;

    @media screen and (max-width: 834px) {
      max-width: 392px;
      column-gap: 20px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      column-gap: 20px;
    }
  }
`;
