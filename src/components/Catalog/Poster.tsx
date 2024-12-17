import React from 'react';
import styled from 'styled-components';

import poster from '../../img/poster-img.png';
import books from '../../img/books-poster.png';
import BaseButton from '../BaseComponentsStyles/BaseButton';

const Poster: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="poster">
        <img src={books} alt="books" className="poster__img" />
        <div className="poster__container">
          <div className="container__info-block">
            <div className="info-block__text">
              <div className="big-title">Build your library with us</div>
              <div className="normal-title">
                Buy two books and get one for free
              </div>
            </div>
            <BaseButton text={`Choose a book`} />
          </div>
          <img src={poster} alt="logo" className="container-img" />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Poster;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  @media screen and (max-width: 834px) {
    padding: 26px 15px;
  }

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
    border-radius: 16px;
    height: 400px;
    @media screen and (max-width: 834px) {
      height: 289px;
    }
    /* @media screen and (max-width: 834px) {
      height: 289px;
    } */
  }

  .poster__img {
    position: absolute;
    bottom: 0;

    @media screen and (max-width: 834px) {
      width: 361px;
      height: 218px;
    }
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;

    @media screen and (max-width: 834px) {
      padding-left: 40px;
      padding-right: 0;
      align-items: end;
    }
    @media screen and (max-width: 320px) {
      flex-direction: column;
    }
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;

    @media screen and (max-width: 834px) {
      margin-bottom: 56px;
    }
  }

  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .container-img {
    position: absolute;
    width: 406px;
    height: 400px;
    left: 60%;

    @media screen and (max-width: 834px) {
      left: 58%;
      width: 328px;
      height: 364px;
    }
    @media screen and (max-width: 320px) {
      width: 253px;
      height: 282px;
      top: 242px;
      left: 271px;
    }
  }
`;
