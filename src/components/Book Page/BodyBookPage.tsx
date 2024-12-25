import React from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import BookCover from './BookCover';
import CommentInput from './CommentInput';
import BookInfo from './BookInfo';
import BookMainInfo from './BookMainInfo';
import { BookType } from '../../lib/types';

const BookPageBody: React.FC<BookType> = (props) => {
  return (
    <StyledWrapper>
      <div className="book">
        <BookCover id={props.id} isFav={!!props.isFav} img={props.img} />
        <div className="book__info">
          <BookMainInfo
            id={props.id}
            author={props.author.text}
            name={props.name}
          />
          <BookInfo description={props.description} cover={props.cover} />
        </div>
      </div>

      <div>
        <div className="comments">
          {props.comments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.text}
              dateOfCreate={comment.dateOfCreate}
              user={comment.user}
            />
          ))}
        </div>
        <CommentInput id={props.id} />
      </div>
    </StyledWrapper>
  );
};

export default BookPageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.base};
  display: flex;
  flex-direction: column;
  row-gap: 110px;
  ${({ theme }) => theme.media.tablet} {
    padding: 100px 15px 88px 15px;
    row-gap: 88px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 48px 15px 60px 15px;
    row-gap: 50px;
  }

  .book {
    display: flex;
    flex-direction: row;
    column-gap: 128px;
    height: auto;

    ${({ theme }) => theme.media.tablet} {
      column-gap: 21px;
    }
  }

  .book__info {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }

  .comments {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
  }
`;
