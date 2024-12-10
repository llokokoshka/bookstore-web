import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import forward from '../../img/right arrow.png';
import openForward from '../../img/Forward down.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenresPopup from '../Popups/GenresPopup';
import PricePopup from '../Popups/PricePopup';
import SortPopup from '../Popups/SortPopup';
import { getGenres } from '../../store/booksEntities/booksEntitiesThunk';

const SortMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { genres, sortBy } = useAppSelector((state) => state.filters);

  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (isGenresOpen && genres.length === 0) {
      dispatch(getGenres());
    }
  }, [isGenresOpen, genres, dispatch]);

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
        <div className="sort-menu__button-container">
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
        <div className="sort-menu__button-container">
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
        <div className="sort-menu__button-container ">
          <div onClick={handlerSortOpen}>
            <button className="button-container__grey-button --light">
              Sort by {sortBy.toLowerCase()}{' '}
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
  padding: ${({ theme }) => theme.padding.header};

  .sort-menu {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .sort-menu__button-container {
    display: flex;
    position: relative;
  }

  .sort-menu__button-container:hover {
    cursor: pointer;
  }

  .button-container__grey-button {
    position: relative;
    background-color: ${({ theme }) => theme.colors.light};
    width: 196px;
    height: 48px;
    padding: 10px 8px 10px 15px;
    border-radius: 16px;
    text-align: start;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    color: ${({ theme }) => theme.colors.dark_blue};
  }

  .arrow {
    position: absolute;
    padding: 12px 30px 12px 0px;
    right: -24px;
    z-index: 10;
  }

  .--light {
    background-color: white;
  }
`;
