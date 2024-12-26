import React from 'react';
import styled from 'styled-components';

import poster from '../../assets/img/poster-img.png';
import books from '../../assets/img/books-poster.png';
import BaseButton from '../BaseComponents/BaseButton';

const Poster: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="poster">
        <div className="poster__container">
          <div className="container__info-block">
            <div className="info-block__text">
              <div className="big-title">Build your library with us</div>
              <div className="normal-title">
                Buy two books and get one for free
              </div>
            </div>
            <BaseButton
              text="Choose a book"
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
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.padding.base_tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .poster {
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.light};

    ${({ theme }) => theme.media.tablet} {
      height: 289px;
    }

    ${({ theme }) => theme.media.mobile} {
      height: auto;
    }
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;
    background-image: url(${books});
    background-repeat: no-repeat;
    background-position: 0 135px;

    ${({ theme }) => theme.media.tablet} {
      align-items: end;
      padding-left: 40px;
      padding-right: 0;
      background-position: 0 78px;
      background-size: 361px 218px;
    }
    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
      padding-left: 20px;
      align-items: center;
      background-position: calc(62%) 17px;
      background-size: 232px 140px;
    }
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    row-gap: 50px;

    ${({ theme }) => theme.media.tablet} {
      margin-bottom: 56px;
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
    ${({ theme }) => theme.media.tablet} {
      width: 328px;
      height: auto;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 253px;
      height: auto;
    }
  }

  .correct-button-size {
    ${({ theme }) => theme.media.mobile} {
      width: 200px;
    }
  }
`;
