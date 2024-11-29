import React from 'react';
import styled from 'styled-components';

import RoundButtons from './RoundButton';
import profile from '../../img/User profile button.png';
import cart from '../../img/Cart.png';
import like from '../../img/Heart.png';
import { useAppSelector } from '../../hooks';
import { AppPages } from '../../constants/textConstants';

const AuthButtons: React.FC = () => {
  const itemsInCArt = useAppSelector((state) => state.cart.numberOfItemsInCart);
  return (
    <StyledWrapper>
      <div className="cart-button">
        <RoundButtons url={AppPages.cart} img={cart} />
        <div>{itemsInCArt}</div>
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
  }
`;
