import React from 'react';
import styled from 'styled-components';

import { ApiPath } from '../../constants/textConstants';
import { CommentsType } from '../../lib/bookTypes';

const Comment: React.FC<CommentsType> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}${ApiPath.avatarImg}`;
  const currentDate = new Date();
  const commentDate = new Date(props.dateOfCreate);
  const timediff = currentDate.getTime() - commentDate.getTime();
  const daysAgo = Math.floor(timediff / (1000 * 3800 * 24));
  return (
    <StyledWrapper>
      <img
        src={dirname + props.user?.avatar}
        alt="img"
        className="avatar change_avatar"
      ></img>
      <div className="comment-block">
        <div className="info">
          <div className="name">{props.user.fullName}</div>
          <div className="data">Left a comment {daysAgo} days ago</div>
        </div>
        <div className="comment-text">{props.text}</div>
      </div>
    </StyledWrapper>
  );
};

export default Comment;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 738px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 16px;
  position: relative;
  padding: 30px 30px 25px 30px;

  .change_avatar {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 30px;
    left: 30px;
    border-radius: 50%;
  }
  .comment-block {
    display: flex;
    flex-direction: column;
    margin-left: 80px;
    row-gap: 9px;
  }
  .info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  .name {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark};
  }

  .data {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_grey};
  }

  .comment-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_blue};
  }
`;
