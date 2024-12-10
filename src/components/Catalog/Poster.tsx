import React from 'react';
import styled from 'styled-components';

import poster from '../../img/poster-img.png';
import books from '../../img/books-poster.png';

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
            <button className="base-button">Choose a book</button>
          </div>
          <img src={poster} alt="logo" />
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
  }

  .poster__img {
    position: absolute;
    bottom: 0;
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 108px 0 98px;
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;
  }

  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
