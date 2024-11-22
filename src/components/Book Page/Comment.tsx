import React from 'react';
import styled from 'styled-components';
import { commentsType } from '../../lib/types';

const Comment: React.FC<commentsType> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/uploads/avatars/`;
  return (
    <StyledWrapper>
      <img
        src={dirname + props.user?.avatar}
        alt="img"
        className="avatar"
      ></img>

      <div>{props.user.fullName}</div>
      {/* <div>{props.dateOfCreate.toDateString()}</div> */}
      <div>{props.text}</div>
    </StyledWrapper>
  );
};

export default Comment;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 738px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.light};
`;
