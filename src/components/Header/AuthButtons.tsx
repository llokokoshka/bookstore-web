import React, { useEffect } from 'react';
import styled from 'styled-components';

import RoundButtons from './RoundButton';
import profile from '../../img/User profile button.png';
import cart from '../../img/Cart.png';
import like from '../../img/Heart.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { getCart } from '../../store/cart/cartThunk';

const AuthButtons: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemsInCArt = useAppSelector((state) => state.cart.numberOfItemsInCart);
  
  useEffect(() => {
    if (!itemsInCArt) {
      dispatch(getCart());
    }
  }, [dispatch, itemsInCArt]);

  return (
    <StyledWrapper>
      <div className="cart-button">
        <div className="cart-button_item">{itemsInCArt}</div>
        <RoundButtons url={AppPages.cart} img={cart} />
      </div>
      <RoundButtons url={AppPages.favorite} img={like} />
      <RoundButtons url={AppPages.profile} img={profile} />
    </StyledWrapper>
  );
};

export default AuthButtons;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 27px;

  .cart-button {
    position: relative;
  }

  .cart-button_item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.green};
    width: 23px;
    height: 23px;
    top: -6px;
    left: 33px;
    gap: 0px;
    opacity: 0px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: ${({ theme }) => theme.colors.dark_blue};
  }
`;
