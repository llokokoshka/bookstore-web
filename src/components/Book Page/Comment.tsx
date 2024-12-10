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
        className="avatar --change-avatar"
      ></img>
      <div className="comment">
        <div className="comment__info">
          <div className="info__name">{props.user.fullName}</div>
          <div className="info__data">Left a comment {daysAgo} days ago</div>
        </div>
        <div className="comment__text">{props.text}</div>
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

  .--change-avatar {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 30px;
    left: 30px;
    border-radius: 50%;
  }

  .comment {
    display: flex;
    flex-direction: column;
    margin-left: 80px;
    row-gap: 9px;
  }

  .comment__info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  .info__name {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark};
  }

  .info__data {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.75px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_grey};
  }

  .comment__text {
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
