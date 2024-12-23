import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IRoundButtonsProps } from '../../lib/types';
import BaseButton from '../BaseComponents/BaseButton';

const RoundButtons: React.FC<IRoundButtonsProps> = (props) => {
  return (
    <StyledWrapper>
      <Link className="todo-body__div-button" to={props.url}>
        <BaseButton buttonClassName="base-round-button" img={props.img} />
      </Link>
    </StyledWrapper>
  );
};

export default RoundButtons;

const StyledWrapper = styled.div`
  .base-round-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    opacity: 0px;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    padding: 0;
    @media screen and (max-width: 320px) {
      width: 32.73px;
      height: 32.73px;
    }
  }

  .base-round-button__img {
    @media screen and (max-width: 320px) {
      width: 17.88px;
      height: 17.33px;
    }
  }
`;
