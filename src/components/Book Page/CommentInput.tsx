import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addComment,
  getBookById,
} from '../../store/booksEntities/booksEntitiesThunk';
import BaseButton from '../BaseComponentsStyles/BaseButton';

interface Props {
  id: number;
}

const CommentInput: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.booksEntities.loading);

  const [inputValue, setInputValue] = useState<string>('');

  const user = useAppSelector((state) => state.auth.user);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue?.length > 0 && props.id && user && user.id) {
      try {
        await dispatch(
          addComment({
            text: inputValue,
            bookId: props.id,
            user: user,
          })
        ).unwrap();
        await dispatch(getBookById(props.id)).unwrap();
        setInputValue('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <StyledWrapper>
      {user ? (
        <form onSubmit={handleAddComment} className="comment">
          <input
            type="text"
            placeholder="Share a comment"
            className="comment__form"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <BaseButton
            buttonClassName="base-button--width"
            type="submit"
            text={loading ? `loading...` : `Post a comment`}
          />
        </form>
      ) : null}
    </StyledWrapper>
  );
};

export default CommentInput;

const StyledWrapper = styled.div`
  margin-top: 60px;
  @media screen and (max-width: 834px) {
    margin-top: 40px;
  }
  .comment__form {
    background-color: ${({ theme }) => theme.colors.light};
    width: 738px;
    height: 128px;
    padding-left: 20px;
    border-radius: 16px;
  }

  .comment {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }

  .base-button--width {
    width: 276px;
  }
`;
