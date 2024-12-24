import React from 'react';
import styled from 'styled-components';

import { CommentsType } from '../../lib/types';

const Comment: React.FC<CommentsType> = (props) => {
  const currentDate = new Date();
  const commentDate = new Date(props.dateOfCreate);
  const timediff = currentDate.getTime() - commentDate.getTime();
  const daysAgo = Math.floor(timediff / (1000 * 3800 * 24));

  return (
    <StyledWrapper>
      <img
        src={props.user?.avatar}
        alt="img"
        className="avatar avatar--comment"
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

  @media screen and (max-width: 834px) {
    width: 667px;
  }
  @media screen and (max-width: 320px) {
    width: 290px;
    padding: 13px 10px 10px 10px;
  }

  .avatar--comment {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 30px;
    left: 30px;
    border-radius: 50%;
    @media screen and (max-width: 320px) {
      width: 35px;
      height: 35px;
      top: 13px;
      left: 10px;
    }
  }

  .comment {
    display: flex;
    flex-direction: column;
    margin-left: 80px;
    row-gap: 9px;
    @media screen and (max-width: 320px) {
      margin-left: 58px;
    }
  }

  .comment__info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    @media screen and (max-width: 320px) {
      row-gap: 0px;
    }
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
    color: ${({ theme }) => theme.colors.dark_grey};
  }

  .comment__text {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_blue};
    @media screen and (max-width: 834px) {
      padding-right: 92px;
    }
    @media screen and (max-width: 320px) {
      padding-right: 0;
      margin-left: -50px;
    }
  }
`;
