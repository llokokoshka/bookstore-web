import React from 'react';
import styled from 'styled-components';

import BaseButton from '../BaseComponents/BaseButton';

type Props = {
  type: string;
  amount: number;
  price: number;
};

const BookButton: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <p>{props.type}</p>
      {props.amount > 0 ? (
        <BaseButton
          buttonClassName="base-button--width"
          text={`$ ${props.price} USD`}
        />
      ) : (
        <BaseButton
          buttonClassName="base-button--width base-button--opacity"
          text="Not available"
        />
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
    ${({ theme }) => theme.media.tablet} {
      width: 188px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 135px;
    }
  }
`;
