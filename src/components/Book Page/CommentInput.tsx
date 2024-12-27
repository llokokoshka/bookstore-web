import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { addComment } from '../../store/booksEntities/booksEntitiesThunk';
import BaseButton from '../BaseComponents/BaseButton';
import BaseInput from '../BaseComponents/BaseInput';
import { CommentsType } from '../../lib/types';
import { socket } from '../../socket';

type Props = {
  id: number;
  comments: CommentsType[];
};

const CommentInput: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.booksEntities.loading);
  const user = useAppSelector((state) => state.auth.user);

  const [inputValue, setInputValue] = useState<string>('');

  const editValueComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target?.value);
  };

  const bookId = props.id;
  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && user) {
      try {
        await dispatch(
          addComment({
            text: inputValue,
            bookId: props.id,
            user: user,
          })
        ).unwrap();
        socket.emit('addComment', { bookId, comment: inputValue });
        setInputValue('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <StyledWrapper>
      {user && (
        <form onSubmit={handleAddComment} className="comment">
          <BaseInput
            type="text"
            placeholder="Share a comment"
            inputClassName="comment__form"
            value={inputValue}
            onChange={editValueComment}
            name="comment"
          />
          <BaseButton
            buttonClassName="base-button--width"
            type="submit"
            text={loading ? 'loading...' : 'Post a comment'}
          />
        </form>
      )}
    </StyledWrapper>
  );
};

export default CommentInput;

const StyledWrapper = styled.div`
  margin-top: 60px;
  ${({ theme }) => theme.media.tablet} {
    margin-top: 40px;
  }

  .comment__form {
    background-color: ${({ theme }) => theme.colors.light};
    padding-left: 20px;
    border-radius: 16px;
    ${({ theme }) => theme.media.mobile} {
      width: 100%;
    }
  }

  .comment {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    ${({ theme }) => theme.media.mobile} {
      width: 100%;
    }
  }

  .base-button--width {
    width: 276px;
  }
`;
