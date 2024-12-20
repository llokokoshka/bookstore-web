import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { IBaseButtonProps } from '../../lib/types';

const BaseButton: React.FC<IBaseButtonProps> = (props) => {
  return (
    <StyledWrapper
      className={cn('', props.buttonClassName)}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
    >
      {props.text}
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

  @media screen and (max-width: 834px) {
    width: 231px;
    height: 44px;
  }
  @media screen and (max-width: 320px) {
    width: 135px;
    padding: 0;
    font-size: 14px;
    line-height: 28px;
  }

  &:hover {
    cursor: pointer;
  }
`;
