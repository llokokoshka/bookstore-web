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
        <button className="base-button">${props.price} USD</button>
      ) : (
        <button className="base-button --opacity">Not available</button>
      )}
    </StyledWrapper>
  );
};

export default BookButton;

const StyledWrapper = styled.div`
  .--opacity {
    opacity: 50%;
  }

  .--opacity:hover {
    opacity: 100%;
  }
`;
