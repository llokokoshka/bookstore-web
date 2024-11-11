import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import Book from './Book';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllBooks } from '../../store/thunk';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';

const MainPageBody = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getBooksFromServer = async () => {
      if (books && books[0] === undefined) {
        try {
          await dispatch(getAllBooks());
        } catch (error) {
          console.error(ERROR_GET_BOOKS_DATA, error);
        }
      }
    };
    getBooksFromServer();
  }, [dispatch, books]);

  return (
    <StyledWrapper>
      <Header />
      <Poster />
      <SortMenu />
      <div className="books-wrapp">
        {books?.map((book) => {
          return (
            <Book
              key={book.id}
              id={book.id}
              img={book.img}
              name={book.name}
              author={book.author.text}
              price={24}
            />
          );
        })}
      </div>
      {user === null ? <AuthPoster /> : null}
      <Footer />
    </StyledWrapper>
  );
};

export default MainPageBody;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .books-wrapp {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
`;
