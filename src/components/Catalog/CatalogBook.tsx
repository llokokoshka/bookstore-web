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
        {props.id && <Rating bookId={props.id} isBookPage={false} />}
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

  ${({ theme }) => theme.media.tablet} {
    flex-basis: 254px;
    width: 254px;
    height: 573px;
    column-gap: 21px;
  }
  ${({ theme }) => theme.media.mobile} {
    flex-basis: 135px;
    width: 135px;
    height: 333px;
    row-gap: 15px;
  }

  .book {
    position: relative;
    width: 100%;
    height: auto;

    ${({ theme }) => theme.media.tablet} {
      max-width: 254px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      width: 39px;
      height: 39px;
      top: 16px;
      left: 16px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 25px;
      height: 25px;
      top: 16px;
      left: 19px;
    }
  }

  .heart-size {
    ${({ theme }) => theme.media.tablet} {
      width: 21px;
      height: 21px;
    }
    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      width: 254px;
      height: 372px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 135px;
      height: 192px;
    }
  }

  .book-info {
    display: flex;
    flex-direction: column;
    width: 299px;
    row-gap: 20px;

    ${({ theme }) => theme.media.tablet} {
      width: 254px;
    }
    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
      line-height: 24px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
      line-height: 24px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      width: 254px;
    }
    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      width: 254px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      top: 320px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      top: 320px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 113px;
      top: 153px;
      left: 12px;
      padding: 10px 0 0 0;
    }
  }
`;
