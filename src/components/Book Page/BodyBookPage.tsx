import React, { useState } from 'react';
import styled from 'styled-components';

import { IPropsBookPageBody } from '../../lib/types';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addComment } from '../../store/thunk';
import Rating from './Rating';
import { ApiPath } from '../../constants/textConstants';

const BookPageBody: React.FC<IPropsBookPageBody> = (props) => {
  const dirnameBookImg = `${process.env.REACT_APP_BASE_URL}${ApiPath.booksImg}`;
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddComment = async () => {
    if (inputValue && props.id && user && user.id) {
      try {
        const response = await dispatch(
          addComment({
            text: inputValue,
            bookId: props.id,
          })
        );
        setInputValue('');
        return response;
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <StyledWrapper>
      <div className="book-information">
        <img
          src={dirnameBookImg + props.img}
          alt="img"
          className="img-book"
        ></img>
        <div className="info-block">
          <div className="big-title">{props.name}</div>
          <div className="normal-title">{props.author}</div>
          <div>
            <div className="normal-title">Description</div>
            <div className="base-text">{props.description}</div>
          </div>
        </div>
      </div>

      <div className="rating-block">
        {props.id ? <Rating bookId={props.id} isUserRAte={true} /> : null}
      </div>
      <div>
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
      {user ? (
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Share a comment"
            className="input-s"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button className="base-button" type="submit">
            Post a comment
          </button>
        </form>
      ) : null}
    </StyledWrapper>
  );
};

export default BookPageBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;
  row-gap: 110px;

  .input-s {
    background-color: ${({ theme }) => theme.colors.light};
    width: 738px;
    height: 128px;
    padding-left: 20px;
  }

  .book-information {
    display: flex;
    flex-direction: row;
    column-gap: 128px;
  }
  .img-book {
    width: 522px;
    height: 779px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }
`;
