import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCatalogApi, getRatingApi } from '../../api/bookApi';
import { QueryParamsType } from '../../lib/types';
import { addOrUpdBook } from '../booksEntities/booksEntitiesSlice';
import { ICatalog } from '../../lib/bookTypes';

export const getCatalog = createAsyncThunk<ICatalog, QueryParamsType>(
  `getCatalog`,
  async (data, thunkAPI) => {
    try {
      let strOfSearch;
      const { pageNum, genres, minPrice, maxPrice, sortBy, search } =
        data;

      if (pageNum === undefined || pageNum === null) {
        strOfSearch = `/books/?page=1&take=12`;
      } else {
        strOfSearch = `/books/?page=${pageNum}&take=12`;
      }

      if (genres) {
        strOfSearch += `&genres=${genres}`;
      }
      if (minPrice) {
        strOfSearch += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        strOfSearch += `&maxPrice=${maxPrice}`;
      }
      if (sortBy) {
        strOfSearch += `&sortBy=${sortBy}`;
      }

      if (search) {
        strOfSearch += `&search=${search}`;
      }
      const catalog = await getCatalogApi(strOfSearch);

      const arrayWithBooks = catalog.data;
      if (arrayWithBooks) {
        thunkAPI.dispatch(addOrUpdBook(arrayWithBooks));

        const ratings = await Promise.all(
          arrayWithBooks.map((book) => getRatingApi(book.id))
        );

        const booksWithRatings = arrayWithBooks.map((book) => {
          const rating = ratings.find((r) => r.bookId === book.id)?.rate || 0;
          return { ...book, totalRate: rating };
        });
        thunkAPI.dispatch(addOrUpdBook(booksWithRatings));
      }

      const newArrWithBookIds = arrayWithBooks
        ? arrayWithBooks.map((book) => {
          return book.id;
        })
        : null;

      const newDataForCatalog: ICatalog = {
        data: newArrWithBookIds,
        meta: catalog.meta,
      };

      return newDataForCatalog;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
