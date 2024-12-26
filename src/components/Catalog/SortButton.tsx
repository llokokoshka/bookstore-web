import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import forward from '../../assets/img/right arrow.png';
import openForward from '../../assets/img/Forward down.png';
import SortPopup from '../Popups/SortPopup';
import GenresPopup from '../Popups/GenresPopup';
import PricePopup from '../Popups/PricePopup';

type Props = {
  fieldRef: React.LegacyRef<HTMLDivElement> | undefined;
  handlerSomethingOpen: React.MouseEventHandler<HTMLDivElement> | undefined;
  text: string;
  isOpen: boolean;
  typeOfPopup: 'sort' | 'genre' | 'price';
};
const SortButton: React.FC<Props> = (props) => {
  const popup =
    props.typeOfPopup === 'sort' ? (
      <SortPopup />
    ) : props.typeOfPopup === 'price' ? (
      <PricePopup />
    ) : (
      <GenresPopup />
    );

  return (
    <StyledWrapper ref={props.fieldRef}>
      <div
        onClick={props.handlerSomethingOpen}
        className={cn('button-body', {
          'button-body--light': props.typeOfPopup === 'sort',
        })}
      >
        <button
          className={cn('button-body__grey-button', {
            'button-body__grey-button--light': props.typeOfPopup === 'sort',
          })}
        >
          {props.text}
        </button>
        {props.isOpen ? (
          <img src={openForward} alt="arrow" className="arrow" />
        ) : (
          <img src={forward} alt="arrow" className="arrow" />
        )}
      </div>
      {props.isOpen && popup}
    </StyledWrapper>
  );
};

export default SortButton;

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  .button-body {
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 16px;
    width: 100%;
  }
  .button-body--light {
    background-color: white;
  }

  .button-body__grey-button {
    position: relative;
    width: 196px;
    height: 48px;
    padding: 10px 8px 10px 15px;
    border-radius: 16px;
    text-align: start;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    color: ${({ theme }) => theme.colors.dark_blue};

    ${({ theme }) => theme.media.tablet} {
      width: auto;
    }
    ${({ theme }) => theme.media.mobile} {
      width: auto;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .arrow {
    position: absolute;
    padding: 12px 30px 12px 0px;
    right: -24px;
    z-index: 10;
  }

  .button-body__grey-button--light {
    background-color: white;
  }
`;
