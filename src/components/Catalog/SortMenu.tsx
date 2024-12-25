import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import forward from '../../assets/img/right arrow.png';
import openForward from '../../assets/img/Forward down.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenresPopup from '../Popups/GenresPopup';
import PricePopup from '../Popups/PricePopup';
import SortPopup from '../Popups/SortPopup';
import { getGenres } from '../../store/booksEntities/booksEntitiesThunk';
import { useSearchParams } from 'react-router-dom';

const SortMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const genres = useAppSelector((state) => state.genres.genres);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const genreRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGenresOpen && genres.length === 0) {
      dispatch(getGenres());
    }
  }, [isGenresOpen, genres, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sortRef.current && !sortRef.current.contains(target) && isSortOpen) {
        setIsSortOpen(false);
      }

      if (
        priceRef.current &&
        !priceRef.current.contains(target) &&
        isPriceOpen
      ) {
        setIsPriceOpen(false);
      }

      if (
        genreRef.current &&
        !genreRef.current.contains(target) &&
        isGenresOpen
      ) {
        setIsGenresOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen, isPriceOpen, isGenresOpen]);

  const handlerGenresOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsGenresOpen(!isGenresOpen);
  };

  const handlerPriceOpen = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const handlerSortOpen = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <StyledWrapper>
      <p className="big-title">Catalog</p>
      <div className="sort-menu">
        <div className="sort-menu__button-container" ref={genreRef}>
          <div onClick={handlerGenresOpen}>
            <button className="button-container__grey-button">Genre</button>
            {isGenresOpen ? (
              <img src={openForward} alt="arrow" className="arrow" />
            ) : (
              <img src={forward} alt="arrow" className="arrow" />
            )}
          </div>
          {isGenresOpen && <GenresPopup />}
        </div>
        <div className="sort-menu__button-container" ref={priceRef}>
          <div onClick={handlerPriceOpen}>
            <button className="button-container__grey-button">Price</button>
            {isPriceOpen ? (
              <img src={openForward} alt="arrow" className="arrow" />
            ) : (
              <img src={forward} alt="arrow" className="arrow" />
            )}
          </div>
          {isPriceOpen && <PricePopup />}
        </div>
        <div className="sort-menu__button-container " ref={sortRef}>
          <div onClick={handlerSortOpen}>
            <button className="button-container__grey-button button-container__grey-button--light">
              Sort by {sortBy ? sortBy.toLowerCase() : 'price'}
            </button>
            {isSortOpen ? (
              <img src={openForward} alt="arrow" className="arrow" />
            ) : (
              <img src={forward} alt="arrow" className="arrow" />
            )}
          </div>
          {isSortOpen && <SortPopup />}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default SortMenu;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.base};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: ${({ theme }) => theme.padding.base_tablet};
    row-gap: 20px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 290px;
  }

  .sort-menu {
    display: flex;
    flex-direction: row;
    column-gap: 20px;

    ${({ theme }) => theme.media.tablet} {
    }

    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
      row-gap: 20px;
    }
  }

  .sort-menu__button-container {
    display: flex;
    position: relative;
  }

  .button-container__grey-button {
    position: relative;
    width: 196px;
    height: 48px;
    padding: 10px 8px 10px 15px;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 16px;
    text-align: start;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    color: ${({ theme }) => theme.colors.dark_blue};

    ${({ theme }) => theme.media.tablet} {
      width: 255px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 290px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .arrow {
    position: absolute;
    padding: 12px 30px 12px 0px;
    right: -24px;
    z-index: 10;
  }

  .button-container__grey-button--light {
    background-color: white;
  }
`;
