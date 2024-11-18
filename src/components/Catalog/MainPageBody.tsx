import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import Book from './Book';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBooks } from '../../store/thunk';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';
import { useSearchParams } from 'react-router-dom';
import {
  setCheckedGenres,
  setMaxPrice,
  setMinPrice,
  setSortBy,
} from '../../store/filterSlice';

const MainPageBody = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const user = useAppSelector((state) => state.auth.user);
  const page = useAppSelector((state) => state.filters.page);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: `${page}`,
    });

    let genres: number[] = [];
    let minPriceParam: string | null;
    let maxPriceParam: string | null;
    let sortByParam: string;

    if (searchParams.getAll('genre')[0]) {
      genres = searchParams.getAll('genre')[0]?.split(',').map(Number);
      for (let genre of genres) {
        dispatch(setCheckedGenres(genre));
      }
    }
    if (searchParams.get('minPrice')) {
      minPriceParam = searchParams.get('minPrice');
      dispatch(setMinPrice(Number(minPriceParam)));
    }
    if (searchParams.get('maxPrice')) {
      maxPriceParam = searchParams.get('minPrice');
      dispatch(setMaxPrice(Number(maxPriceParam)));
    }

    if (searchParams.get('sortBy')) {
      sortByParam = searchParams.getAll('sortBy').toString();
      dispatch(setSortBy(sortByParam));
    }

    const getBooksFromServer = async () => {
      if (books === null) {
        try {
          const pageNum = searchParams.get('page');
          await dispatch(
            getBooks({
              pageNum: pageNum,
              genres: genres.toString() || null,
              minPrice: minPriceParam,
              maxPrice: maxPriceParam,
              sortBy: sortByParam,
            })
          );
        } catch (error) {
          console.error(ERROR_GET_BOOKS_DATA, error);
        }
      }
    };
    getBooksFromServer();
  }, [dispatch, books, setSearchParams, page, searchParams]);

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
