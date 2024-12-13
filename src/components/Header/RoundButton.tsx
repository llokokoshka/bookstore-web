import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface buttonProps {
  img: string;
  url: string;
}

const RoundButtons: React.FC<buttonProps> = (props) => {
  return (
    <StyledWrapper>
      <Link className="todo-body__div-button" to={props.url}>
        <button className="base-round-button base-round-button--display">
          <img src={props.img} alt="icon"></img>
        </button>
      </Link>
    </StyledWrapper>
  );
};

export default RoundButtons;

const StyledWrapper = styled.div`
  .base-round-button--display {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
