import React from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import { BookType } from '../../lib/bookTypes';
import BookCover from './BookCover';
import CommentInput from './CommentInput';
import BookInfo from './BookInfo';

const BookPageBody: React.FC<BookType> = (props) => {
  return (
    <StyledWrapper>
      <div className="book">
        <BookCover
          id={props.id}
          isFav={props.isFav ? props.isFav : false}
          img={props.img}
        />
        <BookInfo
          id={props.id}
          name={props.name}
          description={props.description}
          author={props.author.text}
          cover={props.cover}
        />
      </div>
      <div>
        <div className="comments">
          {Array.isArray(props.comments) &&
            props.comments?.map((comment) => (
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
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;
  row-gap: 110px;
  @media screen and (max-width: 834px) {
    padding: 100px 15px 88px 15px;
    row-gap: 88px;
  }

  .book {
    display: flex;
    flex-direction: row;
    column-gap: 128px;
    height: auto;

    @media screen and (max-width: 834px) {
      column-gap: 21px;
    }
  }

  .comments {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
  }
`;
