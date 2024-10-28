import React from 'react';
import styled from 'styled-components';
// import { useState } from "react";

import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';

const LogIn: React.FC = () => {
  function showPassword() {
    const btn = document.querySelector('.password_btn');
    const input = document.querySelector('.input__field');

    console.log('btn >>>', btn);
    console.log('input >>>', btn);

    btn?.addEventListener('click', () => {
      btn.classList.toggle('active');

      if (input?.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
      } else input?.setAttribute('type', 'password');
    });
  }
  return (
    <StyledWrapper>
      <div className="poster__container">
        <form method="post" className="container__info-block">
          <div className="info-block__text">
            <div className="big-title">Log In</div>
            <div className="input">
              <img src={mail} alt="Email" className="input__icon" />
              <input
                type="text"
                placeholder="Email"
                className="input__field"
              ></input>
            </div>
            <div>Enter your email</div>
            <div className="input">
              <div className="password_btn active" onClick={showPassword}>
                <img src={hide} alt="Password" className="input__icon" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input__field"
                pattern="[0-9a-fA-F]{4,8}"
                autoComplete="false"
              ></input>
            </div>
            <div>Enter your password</div>
          </div>
          <button className="base-button" type="submit">
            Log in
          </button>
        </form>
        <img src={man} alt="man" />
      </div>
    </StyledWrapper>
  );
};

export default LogIn;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  .poster {
    display: flex;
    width: 100%;
    position: relative;
  }

  .poster__img {
    position: absolute;
    bottom: 0;
  }
  .password_btn:hover {
    cursor: pointer;
  }

  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
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
