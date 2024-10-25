import React from "react";
import styled from "styled-components";
// import logo from "../img/logo.png";
import poster from "../img/poster-img.png";
import books from "../img/books-poster.png";

const Poster: React.FC = () => {
  return (
    <Wrapper>
      <div className="poster">
        <img src={books} alt="books" className="poster__img" />
        <div className="poster__container">
          <div className="container__info-block">
            <div className="info-block__text">
              <p className="big-title">Build your library with us</p>
              <p className="normal-title">Buy two books and get one for free</p>
            </div>
            <button className="base-button">Choose a book</button>
          </div>
          <img src={poster} alt="logo" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Poster;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
  }
  .poster__img {
    position: absolute;
    padding-top: 135px;
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
  .info-block__text{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
