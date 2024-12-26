import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import booksImg from '../../assets/img/booksImg.png';
import { AppPages } from '../../constants/textConstants';
import BaseButton from '../BaseComponents/BaseButton';

type Props = {
  page: string;
};

const EmptyPage: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <img src={booksImg} alt="booksiMG" className="img-size"></img>
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
            <BaseButton text="Reset filters" buttonClassName="correct-size" />
          </Link>
        ) : (
          <Link to={AppPages.base}>
            <BaseButton text="Go to catalog" buttonClassName="correct-size" />
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

  ${({ theme }) => theme.media.tablet} {
    padding: 100px 15px 107px 15px;
    column-gap: 62px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    flex-direction: column-reverse;
    align-items: center;
    row-gap: 40px;
  }

  .img-size {
    ${({ theme }) => theme.media.tablet} {
      width: 350px;
      height: 212px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 290px;
      height: 176px;
    }
  }

  .empty-cart__info {
    display: flex;
    flex-direction: column;
    row-gap: 60px;

    ${({ theme }) => theme.media.mobile} {
      width: 100%;
      align-items: center;
      row-gap: 30px;
    }
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
    width: 100%;
    max-width: 465px;
    ${({ theme }) => theme.media.tablet} {
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
    }
  }

  .correct-size {
    width: 290px;
  }
`;
