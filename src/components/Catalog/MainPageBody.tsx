import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';
import { setPage } from '../../store/filter/filterSlice';
import { setQueryParams } from '../../utils/urlUtil';
import Catalog from './Catalog';
import Navigate from './Navigate';
import { getCart } from '../../store/cart/cartThunk';
import { getCatalog } from '../../store/catalog/catalogThunk';
import { getFavorite } from '../../store/favorites/favoritesThunk';

const MainPageBody = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const books = useAppSelector((state) => state.booksEntities.books);
  const booksInCart = useAppSelector((state) => state.cart.normalizeCart);
  const booksInFavorites = useAppSelector(
    (state) => state.favorite.normalizeFavorites
  );
  const catalog = useAppSelector((state) => state.catalog.books);
  const hasNextPage = useAppSelector(
    (state) => state.catalog.meta?.hasNextPage
  );
  const hasPrevPage = useAppSelector(
    (state) => state.catalog.meta?.hasPreviousPage
  );
  const page = useAppSelector((state) => state.catalog.meta?.page);
  const colPages = useAppSelector((state) => state.catalog.meta?.pageCount);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    setQueryParams({
      dispatch: dispatch,
      searchParams: searchParams,
      setSearchParams: setSearchParams,
    });

    let pageNumber = searchParams.get('page');
    let genres = searchParams.getAll('genre')[0]?.split(',').map(Number);
    let minPriceParam = searchParams.get('minPrice');
    let maxPriceParam = searchParams.get('maxPrice');
    let sortByParam = searchParams.get('sortBy');
    let search = searchParams.get('search');

    const getBooksFromServer = async () => {
      if (books === null || catalog === null) {
        try {
          await dispatch(
            getCatalog({
              pageNum: pageNumber,
              genres: genres ? genres.toString() : null,
              minPrice: minPriceParam,
              maxPrice: maxPriceParam,
              sortBy: sortByParam,
              search: search,
            })
          );
        } catch (error) {
          console.error(ERROR_GET_BOOKS_DATA, error);
        }
      }
    };
    getBooksFromServer();
  }, [dispatch, page, searchParams]);

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
      <Header page="Catalog" />
      <Poster />
      <SortMenu />
      <div className="books-wrapp">
        {catalog?.map((id) => {
          return (
            <Catalog
              key={id}
              id={id}
              booksInCart={booksInCart}
              booksInFavorites={booksInFavorites}
              books={books}
            />
          );
        })}
      </div>
      <div className="navigate">
        <Navigate
          hasPrevPage={hasPrevPage}
          handlePagePrev={handlePagePrev}
          colPages={colPages}
          hasNextPage={hasNextPage}
          handlePageNext={handlePageNext}
        />
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
    row-gap: 80px;
    width: 100%;

    @media screen and (max-width: 834px) {
      padding: 0px 15px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      max-height: 290px;
    }
  }

  .navigate {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    margin-bottom: 152px;
  }
  .arr:hover {
    cursor: pointer;
  }
`;
