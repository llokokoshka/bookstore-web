import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Rating from '../Book Page/Rating';
import { AppPages } from '../../constants/textConstants';
import { addCartItem } from '../../store/cart/cartThunk';
import BaseButton from '../BaseComponents/BaseButton';
import CatalogBookCover from './CatalogBookCover';

type Props = {
  img: string;
  id: number;
  name: string;
  author: string;
  price: number | undefined;
  isInCart: boolean;
  isInFavorites: boolean;
  isBestseller: boolean;
  isNew: boolean;
};
const CatalogBook: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const addBookInCart = () => {
    if (!user) {
      navigate(`${AppPages.login}`);
    }
    if (props.id) dispatch(addCartItem(props.id));
  };

  if (props.price === undefined) {
    props.price = 0;
  }

  return (
    <StyledWrapper>
      <CatalogBookCover
        id={props.id}
        img={props.img}
        isBestseller={props.isBestseller}
        isInFavorites={props.isInFavorites}
        isNew={props.isNew}
      />
      <div className="book-info">
        <Link
          to={`${AppPages.getBookIdUrl(props.id)}`}
          className="book-info__text"
        >
          <div className="text__title">{props.name}</div>
          <div className="text__base">{props.author}</div>
          <div></div>
        </Link>
        {props.id ? <Rating bookId={props.id} isBookPage={false} /> : null}
      </div>

      {props.isInCart ? (
        <button className="cart-button">Item in cart</button>
      ) : (
        <BaseButton
          buttonClassName="base-button--size"
          text={`$ ${props.price} USD`}
          onClick={addBookInCart}
        />
      )}
    </StyledWrapper>
  );
};

export default CatalogBook;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 305px;
  width: 305px;
  height: 663px;
  row-gap: 30px;

  @media screen and (max-width: 834px) {
    flex-basis: 254px;
    width: 254px;
    height: 573px;
    column-gap: 21px;
  }
  @media screen and (max-width: 320px) {
    flex-basis: 135px;
    width: 135px;
    height: 333px;
    row-gap: 15px;
  }

  .book {
    position: relative;
    width: 100%;
    height: auto;

    @media screen and (max-width: 834px) {
      max-width: 254px;
    }

    @media screen and (max-width: 320px) {
      max-width: 135px;
    }
  }

  .book__favorite-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    z-index: 5;

    @media screen and (max-width: 834px) {
      width: 39px;
      height: 39px;
      top: 16px;
      left: 16px;
    }
    @media screen and (max-width: 320px) {
      width: 25px;
      height: 25px;
      top: 16px;
      left: 19px;
    }
  }

  .heart-size {
    @media screen and (max-width: 834px) {
      width: 21px;
      height: 21px;
    }
    @media screen and (max-width: 320px) {
      width: 14px;
      height: 14px;
    }
  }

  .book_favorite-button:hover {
    cursor: pointer;
  }

  .book__cover {
    width: 305px;
    height: 448px;
    border-radius: 16px;

    @media screen and (max-width: 834px) {
      width: 254px;
      height: 372px;
    }
    @media screen and (max-width: 320px) {
      width: 135px;
      height: 192px;
    }
  }

  .book-info {
    display: flex;
    flex-direction: column;
    width: 299px;
    row-gap: 20px;

    @media screen and (max-width: 834px) {
      width: 254px;
    }
    @media screen and (max-width: 320px) {
      width: 135px;
    }
  }

  .book-info__text {
    text-decoration: none;
  }

  .text__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_blue};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 834px) {
      font-size: 16px;
      line-height: 24px;
    }

    @media screen and (max-width: 320px) {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .text__base {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;

    text-align: left;
    color: ${({ theme }) => theme.colors.dark_grey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 834px) {
      font-size: 16px;
      line-height: 24px;
    }

    @media screen and (max-width: 320px) {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .book__favorite-button--opacity {
    opacity: 50%;
  }
  .book__favorite-button--opacity:hover {
    opacity: 100%;
  }

  .cart-button {
    width: 305px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border: 1px solid #344966;
    background-color: white;

    color: #344966;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;

    @media screen and (max-width: 834px) {
      width: 254px;
    }
    @media screen and (max-width: 320px) {
      width: 135px;
      font-size: 14px;
      line-height: 28px;
      padding: 0;
    }
  }

  .cart-button:hover {
    /* cursor: pointer; */
  }

  .base-button--size {
    width: 305px;
    height: 48px;
    top: 615px;
    border-radius: 16px;

    @media screen and (max-width: 834px) {
      width: 254px;
    }

    @media screen and (max-width: 320px) {
      width: 135px;
    }
  }

  .book__new {
    position: absolute;

    width: 132px;
    height: 30px;
    top: 398px;
    left: 20px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.green};

    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 9.5px;
    letter-spacing: 0.75px;
    text-align: center;
    color: #344966;
    z-index: 7;

    @media screen and (max-width: 834px) {
      top: 320px;
    }

    @media screen and (max-width: 320px) {
      top: 153px;
      width: 113px;
      left: 12px;
      padding: 10px 0 0 0;
    }
  }

  .book__bestseller {
    position: absolute;
    width: 175px;
    height: 30px;
    top: 398px;
    left: 20px;
    padding: 10px 50px;
    gap: 10px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.dark_blue};

    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 9.5px;
    letter-spacing: 0.75px;
    text-align: center;
    color: white;
    z-index: 7;

    @media screen and (max-width: 834px) {
      top: 320px;
    }
    @media screen and (max-width: 320px) {
      width: 113px;
      top: 153px;
      left: 12px;
      padding: 10px 0 0 0;
    }
  }
`;
