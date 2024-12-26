import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AppPages } from '../../constants/textConstants';
import BaseButton from '../BaseComponents/BaseButton';

type Props = {
  totalPrice: number | undefined;
};

const CartInfoBlock: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="big-title big-title--size">Total: {props.totalPrice}</div>
      <div className="buttons">
        <Link to={`${AppPages.base}`}>
          <button className="cart-button">Continue shopping</button>
        </Link>
        <BaseButton text="Chekout" buttonClassName="correct-button-size" />
      </div>
    </StyledWrapper>
  );
};

export default CartInfoBlock;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  .buttons {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
      row-gap: 18px;
    }
  }

  .cart-button {
    width: 268px;
    height: 48px;
    top: 8px;
    left: 1056px;
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    border: 1px solid #344966;
    color: #344966;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;
    ${({ theme }) => theme.media.mobile} {
      width: 290px;
    }
  }
  .cart-button:hover {
    cursor: pointer;
  }

  .big-title--size {
    font-size: 24px;
    line-height: 36px;
  }

  .correct-button-size {
    width: 290px;
  }
`;
