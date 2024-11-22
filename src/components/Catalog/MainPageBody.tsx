import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import Book from './Book';
import rightArr from '../../img/right arrow.png';
import leftArr from '../../img/left arrow.png';
import emtyRow from '../../img/Ellipse.png';
import fullRow from '../../img/Ellipse full.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBooks, getCart } from '../../store/thunk';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';
import {
  setCheckedGenres,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSortBy,
} from '../../store/filterSlice';

const MainPageBody = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const user = useAppSelector((state) => state.auth.user);
  const page = useAppSelector((state) => state.filters.page);
  const booksInCart = useAppSelector((state) => state.cart.normalizeCart);

  const [searchParams, setSearchParams] = useSearchParams();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [colPages, setColPages] = useState(0);

  useEffect(() => {
    if (Object.keys(booksInCart).length === 0) {
      try {
        dispatch(getCart());
      } catch (err) {
        console.error(err);
      }
    }
  }, [booksInCart, dispatch]);

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
          const info = await dispatch(
            getBooks({
              pageNum: page.toString(),
              genres: genres.toString() || null,
              minPrice: minPriceParam,
              maxPrice: maxPriceParam,
              sortBy: sortByParam,
            })
          );
          setColPages(info.payload.meta.pageCount);
          setHasNextPage(info.payload.meta.hasNextPage);
          setHasPrevPage(info.payload.meta.hasPreviousPage);
        } catch (error) {
          console.error(ERROR_GET_BOOKS_DATA, error);
        }
      }
    };
    getBooksFromServer();
  }, [dispatch, books, setSearchParams, page, searchParams]);

  const handlePagePrev = () => {
    setPage(page - 1);
  };
  const handlePageNext = () => {
    setPage(page + 1);
  };

  return (
    <StyledWrapper>
      <Header />
      <Poster />
      <SortMenu />
      <div className="books-wrapp">
        {books?.map((book) => {
          let inCart = false;
          if (booksInCart && booksInCart[book.id]) {
            inCart = true;
          }
          return (
            <Book
              key={book.id}
              id={book.id}
              img={book.img}
              name={book.name}
              author={book.author.text}
              price={
                book.cover?.hardcover_amount && book.cover?.hardcover_amount > 0
                  ? book.cover?.hardcover_price
                  : book.cover?.paperback_price
              }
              isInCart={inCart}
            />
          );
        })}
      </div>
      <div className="navigate">
        {hasPrevPage ? (
          <div onClick={handlePagePrev}>
            <img src={leftArr} alt="left arr"></img>
          </div>
        ) : null}
        {colPages === 1 ? (
          <img src={fullRow} alt="dot" />
        ) : colPages === 2 ? (
          <>
            <img src={fullRow} alt="dot" /> <img src={emtyRow} alt="dot" />
          </>
        ) : colPages === 3 || colPages > 3 ? (
          <>
            <img src={fullRow} alt="dot" />
            <img src={emtyRow} alt="dot" /> <img src={emtyRow} alt="dot" />
          </>
        ) : null}
        {hasNextPage ? (
          <div className="arr" onClick={handlePageNext}>
            <img src={rightArr} alt="right arr"></img>{' '}
          </div>
        ) : null}
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

  .navigate {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .arr:hover {
    cursor: pointer;
  }
`;
