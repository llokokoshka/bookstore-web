import React from 'react';
import styled from 'styled-components';

import booksImg from '../../img/booksImg.png';
import { Link } from 'react-router-dom';
import { AppPages } from '../../constants/textConstants';

interface Props {
  page: string;
}

const EmptyPage: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <img src={booksImg} alt="booksiMG"></img>
      <div className="empty-cart__info">
        <div className="info__text">
          <div className="big-title">Your {props.page} is empty</div>
          {props.page === 'catalog' ? (
            <div className="cart__text">
              There are no books with these filters
            </div>
          ) : (
            <div className="cart__text">
              Add items to {props.page} to make a purchase. Go to the catalogue
              no.
            </div>
          )}
        </div>
        {props.page === 'catalog' ? (
          <Link to={AppPages.base}>
            <button className="base-button">Reset filters</button>
          </Link>
        ) : (
          <Link to={AppPages.base}>
            <button className="base-button">Go to catalog</button>
          </Link>
        )}
      </div>
    </StyledWrapper>
  );
};

export default EmptyPage;

const StyledWrapper = styled.div`
  padding: 118px 0px 148px 0;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  column-gap: 109px;
  height: auto;

  .empty-cart__info {
    display: flex;
    flex-direction: column;
    row-gap: 60px;
  }

  .info__text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .cart__text {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 465px;
  }
`;
