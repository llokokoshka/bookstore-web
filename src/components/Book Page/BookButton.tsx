import React from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  amount: number;
  price: number;
}

const BookButton: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <p>{props.type}</p>
      {props.amount > 0 ? (
        <button className="base-button base-button--width">
          ${props.price} USD
        </button>
      ) : (
        <button className="base-button base-button--width base-button--opacity">
          Not available
        </button>
      )}
    </StyledWrapper>
  );
};

export default BookButton;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  .base-button--opacity {
    opacity: 50%;
  }

  .base-button--opacity:hover {
    opacity: 100%;
  }
  .base-button--width {
    @media screen and (max-width: 834px) {
      width: 188px;
    }
  }
`;
