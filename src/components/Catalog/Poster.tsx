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
            <BaseButton
              text={`Choose a book`}
              buttonClassName="correct-button-size"
            />
          </div>
          <img src={poster} alt="logo" className="container-img" />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Poster;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.base};
  @media screen and (max-width: 834px) {
    padding: ${({ theme }) => theme.padding.base_tablet};
  }

  .poster {
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.light};

    @media screen and (max-width: 834px) {
      height: 289px;
    }

    @media screen and (max-width: 320px) {
      height: auto;
    }
  }

  .poster__img {
    position: absolute;
    bottom: 0;
    max-width: 406px;
    max-height: 400px;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 834px) {
      max-width: 361px;
      max-height: 218px;
    }
    @media screen and (max-width: 320px) {
      max-width: 232px;
      max-height: 140px;
      right: 0;
      left: 70px;
      top: 0;
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
      align-items: end;
      padding-left: 40px;
      padding-right: 0;
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
    width: 100%;
    row-gap: 50px;

    @media screen and (max-width: 834px) {
      margin-bottom: 56px;
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
    @media screen and (max-width: 834px) {
      width: 328px;
      height: auto;
    }
    @media screen and (max-width: 320px) {
      width: 253px;
      height: auto;
    }
  }

  .correct-button-size {
    @media screen and (max-width: 320px) {
      width: 200px;
    }
  }
`;
