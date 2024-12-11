import React from 'react';
import styled from 'styled-components';

import fairy from '../../img/fairy.png';
import castle from '../../img/castle.png';
import { AppPages } from '../../constants/textConstants';
import { Link } from 'react-router-dom';

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
            <Link to={AppPages.registration}>
              <button className="base-button --correct">Log In/Sing Up</button>
            </Link>
          </div>
        </div>
        <img src={fairy} alt="books" className="poster__img" />
      </div>
    </StyledWrapper>
  );
};

export default AuthPoster;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  @media screen and (max-width: 835px) {
    padding: 26px 15px;
  }

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
    height: 400px;
    border-radius: 16px;
  }

  .poster__img {
    position: absolute;
    right: 0;
    bottom: 0;
    @media screen and (max-width: 835px) {
      width: 377px;
      height: 455px;
      z-index: 1;
    }
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 757px;

    @media screen and (max-width: 835px) {
      padding-left: 411px;
      padding-right: 0;
      align-items: end;
    }
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;

    @media screen and (max-width: 835px) {
      margin-bottom: 118px;
      margin-right: 1px;
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

    @media screen and (max-width: 835px) {
      width: 389px;
      height: 345px;
      /* top: 117px; */
      left: 1px;
    }
  }

  .--correct {
    z-index: 11;
  }
`;
