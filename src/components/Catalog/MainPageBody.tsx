import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer';
import Poster from './Poster';
import SortMenu from './SortMenu';
import AuthPoster from './AuthPoster';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSearchParamsObj } from '../../utils/urlUtil';
import BookInCatalog from './BookInCatalog';
import Navigate from './Navigate';
import EmptyPage from '../Cart/EmtyPage';
import { getCatalog } from '../../store/catalog/catalogThunk';
import { ERROR_GET_BOOKS_DATA } from '../../constants/errorConstants';

const MainPageBody: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const books = useAppSelector((state) => state.booksEntities.books);
  const catalog = useAppSelector((state) => state.catalog.books);
  const page = useAppSelector((state) => state.catalog.meta.page);
  const colPages = useAppSelector((state) => state.catalog.meta.pageCount);
  const hasNextPage = useAppSelector(
    (state) => state.catalog.meta?.hasNextPage
  );
  const hasPrevPage = useAppSelector(
    (state) => state.catalog.meta?.hasPreviousPage
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updatedParams = getSearchParamsObj({
      searchParams: searchParams,
    });

    setSearchParams(updatedParams, { replace: true });

    try {
      dispatch(
        getCatalog({
          pageNum: updatedParams?.page || '1',
          genres: updatedParams.genre || null,
          minPrice: updatedParams?.minPrice || null,
          maxPrice: updatedParams?.maxPrice || null,
          sortBy: updatedParams?.sortBy || null,
          search: updatedParams?.search || null,
        })
      );
    } catch (error) {
      console.error(ERROR_GET_BOOKS_DATA, error);
    }
    // eslint-disable-next-line
  }, [dispatch, page, searchParams]);

  const handlePrevPage = () => {
    if (hasPrevPage && page) {
      searchParams.set('page', (page - 1).toString());

      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
      });
      window.scrollTo(0, 575);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && page) {
      searchParams.set('page', (page + 1).toString());

      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
      });
      window.scrollTo(0, 575);
    }
  };

  return (
    <StyledWrapper>
      <Header page="Catalog" />
      <div className="main-page">
        <Poster />
        <SortMenu />
        <div className="catalog">
          {!(catalog?.length === 0) ? (
            catalog?.map((id) => {
              return <BookInCatalog key={id} book={books[id]} />;
            })
          ) : (
            <EmptyPage page="catalog" />
          )}
        </div>
        <Navigate
          hasPrevPage={hasPrevPage ? true : false}
          handlePagePrev={handlePrevPage}
          page={page}
          colPages={colPages}
          hasNextPage={hasNextPage ? true : false}
          handlePageNext={handleNextPage}
        />
        {user === null && <AuthPoster />}
      </div>
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

  .catalog {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: ${({ theme }) => theme.padding.base};
    column-gap: 20px;
    row-gap: 80px;

    @media screen and (max-width: 834px) {
      padding: 0px 15px;
      row-gap: 30px;
    }

    @media screen and (max-width: 320px) {
      row-gap: 30px;
    }
  }
`;
