import React from 'react';
import styled from 'styled-components';

import Rating from './Rating';

type Props = {
  id: number;
  name: string;
  author: string;
};
const BookMainInfo: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="main-info">
        <div className="big-title">{props.name}</div>
        <div className="normal-title">{props.author}</div>
      </div>
      {props.id ? <Rating bookId={props.id} isUserRate={true} /> : null}
    </StyledWrapper>
  );
};

export default BookMainInfo;

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
  @media screen and (max-width: 320px) {
    max-width: 135px;
  }

  .main-info {
    display: flex;
    flex-direction: column;
    max-width: 630px;
    width: 100%;
    flex-wrap: wrap;
    word-break: break-all;
    white-space: normal;

    @media screen and (max-width: 834px) {
      max-width: 392px;
    }
    @media screen and (max-width: 320px) {
      max-width: 135px;
    }
  }
`;
