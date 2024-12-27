import React, { useEffect } from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import BookCover from './BookCover';
import CommentInput from './CommentInput';
import BookInfo from './BookInfo';
import BookMainInfo from './BookMainInfo';
import { BookType } from '../../lib/types';
import { socket } from '../../socket';

const BookPageBody: React.FC<BookType> = (props) => {
  const bookId = props.id;

  useEffect(() => {
    socket.emit('joinRoom', { bookId });

    socket.on('newComment', (data) => {
      console.log('here', data);
    });

    return () => {
      socket.off('newComment');
    };
  }, [bookId]);

  return (
    <StyledWrapper>
      <div className="book">
        <div className="area-cover">
          <BookCover id={props.id} isFav={!!props.isFav} img={props.img} />
        </div>
        <div className="area-main-info">
          <BookMainInfo
            id={props.id}
            author={props.author.text}
            name={props.name}
          />
        </div>
        <div className="area-info">
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
        <CommentInput id={props.id} comments={props.comments} />
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
    width: 100%;
  }

  .book {
    display: grid;
    grid-template-areas:
      'cover mainInfo'
      'cover decription';
    grid-template-columns: 1fr 2fr;
    column-gap: 128px;
    height: auto;

    ${({ theme }) => theme.media.tablet} {
      column-gap: 21px;
    }

    ${({ theme }) => theme.media.mobile} {
      grid-template-areas:
        'cover mainInfo'
        'decription decription';
      grid-template-columns: 1fr 1fr;
    }
  }
  .area-cover {
    grid-area: cover;
  }
  .area-main-info {
    grid-area: mainInfo;
  }
  .area-info {
    grid-area: decription;
  }
  .comments {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
    ${({ theme }) => theme.media.mobile} {
      width: 100%;
    }
  }
`;
