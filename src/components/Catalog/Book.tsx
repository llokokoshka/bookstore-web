import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { addCartItem } from '../../store/thunk';

interface Props {
  img: string;
  id: number | undefined;
  name: string;
  author: string;
  price: number | undefined;
  isInCart: boolean;
}

const Book: React.FC<Props> = (props) => {
  const dirname = `${process.env.REACT_APP_BASE_URL}/uploads/books/`;
  const dispatch = useAppDispatch();

  const addBookInCart = () => {
    if (props.id) dispatch(addCartItem(props.id));
  };
  if (props.price === undefined) {
    props.price = 0;
  }
  return (
    <StyledWrapper>
      <Link to={`/${props.id}`}>
        <div className="">
          <img src={dirname + props.img} alt="img" className="avatar"></img>
        </div>

        <div className="normal-title">{props.name}</div>
        <div className="base-text">{props.author}</div>
        <div></div>
      </Link>
      {props.isInCart ? (
        <button className="cart-button">Item in cart</button>
      ) : (
        <button className="base-button correct" onClick={addBookInCart}>
          $ {props.price} USD
        </button>
      )}
    </StyledWrapper>
  );
};

export default Book;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: column;

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
  }
  .poster__img {
    position: absolute;
    bottom: 0;
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;
  }
  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .correct {
    width: 305px;
    height: 48px;
    top: 615px;
    padding: 10px 50px 10px 50px;
    gap: 0px;
    border-radius: 16px;
  }

  .cart-button {
    width: 231px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border-color: #344966;
    opacity: 0px;
    color: #344966;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;
  }
`;
