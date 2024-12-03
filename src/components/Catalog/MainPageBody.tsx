import React, { useEffect } from 'react';
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
import { getCatalog, getCart, getFavorite } from '../../store/thunk';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';
import {
  setCheckedGenres,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSortBy,
} from '../../store/filterSlice';
import { setQueryParams } from '../../api/urlApi';

const MainPageBody = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.booksEntities.books);
  const catalog = useAppSelector((state) => state.catalog.books);
  const user = useAppSelector((state) => state.auth.user);
  const booksInCart = useAppSelector((state) => state.cart.normalizeCart);
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const page = useAppSelector((state) => state.catalog.meta?.page);
  const hasNextPage = useAppSelector(
    (state) => state.catalog.meta?.hasNextPage
  );
  const hasPrevPage = useAppSelector(
    (state) => state.catalog.meta?.hasPreviousPage
  );
  const colPages = useAppSelector((state) => state.catalog.meta?.pageCount);

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
    let pageNumber: string | null;
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

    if (searchParams.get('page')) {
      pageNumber = searchParams.get('page');
      dispatch(setPage(Number(pageNumber)));
    }

    if (searchParams.get('minPrice')) {
      minPriceParam = searchParams.get('minPrice');
      dispatch(setMinPrice(Number(minPriceParam)));
    }

    if (searchParams.get('maxPrice')) {
      maxPriceParam = searchParams.get('maxPrice');
      dispatch(setMaxPrice(Number(maxPriceParam)));
    }

    if (searchParams.get('sortBy')) {
      sortByParam = searchParams.getAll('sortBy').toString();
      dispatch(setSortBy(sortByParam));
    }

    const getBooksFromServer = async () => {
      if (books === null || catalog === null) {
        try {
          const a = await dispatch(
            getCatalog({
              pageNum: pageNumber,
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
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (user && Object.keys(booksInCart).length === 0) {
      try {
        dispatch(getCart());
      } catch (err) {
        console.error(err);
      }
    }
    if (user && Object.keys(booksInFavorites).length === 0) {
      try {
        dispatch(getFavorite());
      } catch (err) {
        console.error(err);
      }
    }
  }, [user, dispatch]);

  const handlePagePrev = () => {
    if (hasPrevPage && page) {
      dispatch(setPage(page - 1));
      setQueryParams({
        dispatch: dispatch,
        searchParams: searchParams,
        setSearchParams: setSearchParams,
        pageNum: (page - 1).toString(),
      });
    }
  };
  const handlePageNext = () => {
    if (hasNextPage && page) {
      dispatch(setPage(page + 1));
      setQueryParams({
        dispatch: dispatch,
        searchParams: searchParams,
        setSearchParams: setSearchParams,
        pageNum: (page + 1).toString(),
      });
    }
  };

  return (
    <StyledWrapper>
      <Header />
      <Poster />
      <SortMenu />
      <div className="books-wrapp">
        {catalog?.map((id) => {
          let inCart = false;
          let inFavorites = false;
          if (booksInCart && booksInCart[id]) {
            inCart = true;
          }
          if (booksInFavorites && booksInFavorites[id]) {
            inFavorites = true;
          }
          const currentBook = books?.find((book) => book.id === id);
          return (
            <>
              {currentBook ? (
                <Book
                  key={currentBook.id}
                  id={currentBook.id}
                  img={currentBook.img}
                  name={currentBook.name}
                  author={currentBook.author.text}
                  price={
                    currentBook.cover?.hardcover_amount &&
                    currentBook.cover?.hardcover_amount > 0
                      ? currentBook.cover?.hardcover_price
                      : currentBook.cover?.paperback_price
                  }
                  isInCart={inCart}
                  isInFavorites={inFavorites}
                />
              ) : null}
            </>
          );
        })}
      </div>
      <div className="navigate">
        {hasPrevPage ? (
          <div className="arr" onClick={handlePagePrev}>
            <img src={leftArr} alt="left arr"></img>
          </div>
        ) : null}
        {colPages === 1 ? (
          <img src={fullRow} alt="dot" />
        ) : colPages === 2 ? (
          <>
            <img src={fullRow} alt="dot" /> <img src={emtyRow} alt="dot" />
          </>
        ) : colPages && (colPages === 3 || colPages > 3) ? (
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
    justify-content: space-between;
    flex-wrap: wrap;
    padding: ${({ theme }) => theme.padding.header};

    column-gap: 20px;
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
