import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BaseButton from '../BaseComponents/BaseButton';

type Props = {
  img: string;
  url: string;
};

const RoundButtons: React.FC<Props> = (props) => {
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
    ${({ theme }) => theme.media.mobile} {
      width: 32.73px;
      height: 32.73px;
      min-height: 32.73px;
    }
  }

  .base-round-button__img {
    ${({ theme }) => theme.media.mobile} {
      width: 17.88px;
      height: 17.33px;
    }
  }
`;
