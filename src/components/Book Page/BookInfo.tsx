import React from 'react';
import styled from 'styled-components';

import Rating from './Rating';
import BookDescription from './BookDescription';
import BookButton from './BookButton';
import { CoverType } from '../../lib/bookTypes';

interface Props {
  id: number;
  name: string;
  description: string;
  author: string;
  cover: CoverType;
}

const BookInfo: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="main-info">
        <div className="big-title">{props.name}</div>
        <div className="normal-title">{props.author}</div>
      </div>
      {props.id ? <Rating bookId={props.id} isUserRate={true} /> : null}
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
  row-gap: 30px;
  max-width: 630px;
  width: 100%;
  height: auto;
  @media screen and (max-width: 834px) {
    max-width: 392px;
  }

  .main-info {
    display: flex;
    flex-direction: column;
    max-width: 630px;
    width: 100%;
    flex-wrap: wrap;
    word-break: break-all;
    hyphens: auto;
    @media screen and (max-width: 834px) {
      max-width: 392px;
    }
  }

  .info-block__buttons {
    display: flex;
    flex-direction: row;
    max-width: 541px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 834px) {
      max-width: 392px;
    }
  }
`;
