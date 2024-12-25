import React from 'react';
import styled from 'styled-components';

import RoundButtons from './RoundButton';
import profile from '../../assets/img/User profile button.png';
import cart from '../../assets/img/Cart.png';
import like from '../../assets/img/Heart.png';
import { AppPages } from '../../constants/textConstants';

type Props = {
  itemsInCart: number;
};

const UserButtons: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="cart-button">
        <div className="cart-button__item">{props.itemsInCart}</div>
        <RoundButtons url={AppPages.cart} img={cart} />
      </div>
      <RoundButtons url={AppPages.favorite} img={like} />
      <RoundButtons url={AppPages.profile} img={profile} />
    </StyledWrapper>
  );
};

export default UserButtons;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 198px;
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.media.mobile} {
    max-width: 135px;
  }

  .cart-button {
    position: relative;
  }

  .cart-button__item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.green};
    width: 23px;
    height: 23px;
    top: -6px;
    left: 33px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_blue};
    ${({ theme }) => theme.media.mobile} {
      width: 15.81px;
      height: 15.33px;
      top: -4px;
      left: 22.69px;
    }
  }
`;
