import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import fairy from '../../assets/img/atz 1.png';
import castle from '../../assets/img/castle.png';
import { AppPages } from '../../constants/textConstants';
import BaseButton from '../BaseComponents/BaseButton';

const AuthPoster: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="poster">
        <div className="poster__container">
          <img src={castle} alt="logo" className="container-img" />
          <div className="container__info-block">
            <div className="info-block__text">
              <div className="big-title">Authorize now</div>
              <div className="normal-title">
                Authorize now and discover the fabulous world of books
              </div>
            </div>
            <Link to={AppPages.registration} className="base-button--top">
              <BaseButton
                buttonClassName="base-button--top"
                text="Log In/Sing Up"
              />
            </Link>
            <img src={fairy} alt="books" className="poster__img" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default AuthPoster;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.base};

  @media screen and (max-width: 834px) {
    padding: ${({ theme }) => theme.padding.base_tablet};
  }

  .poster {
    display: flex;
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.colors.light};
    @media screen and (max-width: 834px) {
      height: 400px;
    }
    @media screen and (max-width: 320px) {
      height: 505px;
    }
  }

  .poster__img {
    position: absolute;
    right: 0;
    top: 0px;
    width: 478px;
    height: 759px;
    z-index: 1;

    @media screen and (max-width: 834px) {
      max-width: 377px;
      height: auto;
      top: 30px;
      rotate: -10deg;
    }

    @media screen and (max-width: 320px) {
      width: 246px;
      height: auto;
      right: 0;
      top: 10px;
    }
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 757px;

    @media screen and (max-width: 834px) {
      padding-left: 411px;
      padding-right: 0;
      align-items: end;
    }
    @media screen and (max-width: 320px) {
      flex-direction: column;
      padding-left: 20px;
      align-items: start;
    }
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;

    @media screen and (max-width: 834px) {
      margin-bottom: 118px;
      margin-right: 1px;
    }

    @media screen and (max-width: 320px) {
      max-width: 230px;
      padding-top: 20px;
      row-gap: 20px;
    }
  }

  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .container-img {
    position: absolute;
    width: 521px;
    height: 462px;
    left: 108px;
    bottom: 0;
    overflow: visible;
    z-index: 2;

    @media screen and (max-width: 834px) {
      width: 389px;
      height: auto;
      left: 1px;
    }
    @media screen and (max-width: 320px) {
      width: 253px;
      height: auto;
      bottom: 0;
      left: 18px;
    }
  }

  .base-button--top {
    z-index: 11;
  }
`;
