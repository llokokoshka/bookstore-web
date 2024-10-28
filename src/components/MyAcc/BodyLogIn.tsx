import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeInputTypeHandler = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const changeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginUser = createAsyncThunk(
    '/sign-in',
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await axios.post('/auth/sign-in', {
          email,
          password,
        });
        console.log(response);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <StyledWrapper>
      <div className="poster__container">
        <form
          method="post"
          className="container__info-block"
          onSubmit={handleSubmit}
        >
          <div className="info-block__text">
            <div className="big-title">Log In</div>
            <div className="input">
              <img src={mail} alt="Email" className="input__icon" />
              <input
                type="text"
                placeholder="Email"
                className="input__field"
                value={email}
                onChange={changeEmailValue}
              ></input>
            </div>
            <div>Enter your email</div>
            <div className="input">
              <div
                className="password__btn active"
                onClick={changeInputTypeHandler}
              >
                <img src={hide} alt="Password" className="input__icon" />
              </div>
              <input
                type={inputType}
                placeholder="Password"
                className="input__field"
                // pattern="[0-9a-fA-F]{4,8}"
                autoComplete="false"
                value={password}
                onChange={changePasswordValue}
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
