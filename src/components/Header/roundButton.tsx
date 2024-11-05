import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface buttonProps {
  img: string;
  url: string;
}

const RoundButtons: React.FC<buttonProps> = (props) => {
  return (
    <StyledWrapper>
      <Link className="todo-body__div-button" to={props.url}>
        <button className="base-round-button lable-nice">
          <img src={props.img} alt="icon"></img>
        </button>
      </Link>
    </StyledWrapper>
  );
};

export default RoundButtons;

const StyledWrapper = styled.div`
  .lable-nice {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
