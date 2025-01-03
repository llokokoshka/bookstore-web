import React from 'react';
import styled from 'styled-components';

import plus from '../../assets/img/plus.png';
import minus from '../../assets/img/minus.png';
import rubbish from '../../assets/img/Delete.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteCartItem,
  downAmountCartItem,
  upAmountCartItem,
} from '../../store/cart/cartThunk';

type Props = {
  id: number;
  quantity: number;
};

const BookAmount: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleMinusQuantity = async () => {
    if (props.quantity === 1) {
      await dispatch(deleteCartItem(props.id));
    } else {
      await dispatch(downAmountCartItem(props.id));
    }
  };

  const handlePlusQuantity = async () => {
    const isAdd = await dispatch(
      upAmountCartItem({ ItemId: props.id, quantity: props.quantity })
    );
  };

  const handleDeleteItem = async () => {
    await dispatch(deleteCartItem(props.id));
  };

  return (
    <StyledWrapper>
      <div className="amount__block">
        <div className="block__button" onClick={handleMinusQuantity}>
          <img src={minus} alt="img" className="button__img"></img>
        </div>
        <div className="correct-size">{props.quantity}</div>
        <div className="block__button" onClick={handlePlusQuantity}>
          <img src={plus} alt="img" className="button__img"></img>
        </div>
      </div>
      <img
        src={rubbish}
        alt="img"
        className="amount__rubbish-img"
        onClick={handleDeleteItem}
      ></img>
    </StyledWrapper>
  );
};

export default BookAmount;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 58px;
  width: 100%;
  ${({ theme }) => theme.media.mobile} {
    column-gap: 24px;
  }

  .amount__block {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 14px;
  }

  .block__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.light};
    width: 32px;
    height: 32px;
    gap: 0px;
    border-radius: 22px;
    opacity: 0px;
  }

  .block__button:hover {
    cursor: pointer;
  }

  .button__img {
    width: 8px;
    height: auto;
  }

  .amount__rubbish-img {
    width: 20px;
    height: 20px;
  }

  .amount__rubbish-img:hover {
    cursor: pointer;
  }
`;
