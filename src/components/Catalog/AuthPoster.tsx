import React from 'react';
import styled from 'styled-components';

import fairy from '../../img/atz 1.png';
import castle from '../../img/castle.png';

const AuthPoster: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="poster">
        <div className="poster__container">
          <img src={castle} alt="logo" />
          <div className="container__info-block">
            <div className="info-block__text">
              <div className="big-title">Authorize now</div>
              <div className="normal-title">
                Authorize now and discover the fabulous world of books
              </div>
            </div>
            <button className="base-button">Log In/Sing Up</button>
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

  .poster {
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    width: 100%;
    position: relative;
  }
  .poster__img {
    position: absolute;
    right: 0;
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
