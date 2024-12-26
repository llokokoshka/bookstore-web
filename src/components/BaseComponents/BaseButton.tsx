import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

type Props = {
  buttonClassName?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: React.CSSProperties;
  img?: string;
};

const BaseButton: React.FC<Props> = (props) => {
  return (
    <StyledWrapper
      className={cn(props.buttonClassName)}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
    >
      {props.img ? (
        <img
          src={props.img}
          alt="icon"
          className="base-round-button__img"
        ></img>
      ) : (
        props.text
      )}
    </StyledWrapper>
  );
};

export default BaseButton;

export const StyledWrapper = styled.button`
  width: 231px;
  height: 44px;
  top: 8px;
  left: 1056px;
  padding: ${({ theme }) => theme.padding.button};
  gap: 10px;
  border-radius: ${({ theme }) => theme.sizes.base_radius}px;
  color: white;
  background-color: #344966;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;
  z-index: 5;

  ${({ theme }) => theme.media.tablet} {
    width: 231px;
    height: 44px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 135px;
    max-height: 44px;

    padding: 0;
    font-size: 14px;
    line-height: 28px;
  }

  &:hover {
    cursor: pointer;
  }

  .base-round-button__img {
    ${({ theme }) => theme.media.mobile} {
      width: 17.88px;
      height: 17.33px;
    }
  }
`;
