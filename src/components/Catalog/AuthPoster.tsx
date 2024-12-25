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

  ${({ theme }) => theme.media.tablet} {
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
    ${({ theme }) => theme.media.tablet} {
      height: 400px;
    }
    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      max-width: 377px;
      height: auto;
      top: 30px;
      rotate: -10deg;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      padding-left: 411px;
      padding-right: 0;
      align-items: end;
    }
    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      margin-bottom: 118px;
      margin-right: 1px;
    }

    ${({ theme }) => theme.media.mobile} {
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

    ${({ theme }) => theme.media.tablet} {
      width: 389px;
      height: auto;
      left: 1px;
    }
    ${({ theme }) => theme.media.mobile} {
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
