import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubmitHandler, useForm } from 'react-hook-form';

import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const [inputType, setInputType] = useState('password');

  const changeInputTypeHandler = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const loginUser = createAsyncThunk(
    '/sign-in',
    async ({ email, password }: IFormInput) => {
      try {
        const response = await axios.post('/auth/sign-in', {
          email,
          password,
        });
        console.log(response.data.access_token);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    console.log(data.email, data.password);
    try {
      console.log('Валидация прошла успешно!');
      const user = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );
      if (user.payload) {
        navigate('/');
      }
      reset();
    } catch (err) {
      console.warn('При авторизации возникла ошибка: ', err);
    }
  };

  return (
    <StyledWrapper>
      <div className="poster__container">
        <form
          method="post"
          className="container__info-block"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="info-block__text">
            <div className="big-title">Log In</div>
            <div className="input">
              <img src={mail} alt="Email" className="input__icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input__field"
                {...register('email', {
                  required: true,
                  // pattern: {
                  //   // value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //   message: 'Введите корректный email',
                  // },
                })}
              />
            </div>
            {errors.email?.type === 'required' && (
              <div>Email - обязательное поле.</div>
            )}
            {errors.email && <div>{errors.email.message}</div>}
            {!errors.email && <div>Enter your email</div>}
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
                autoComplete="false"
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 5,
                    message: 'min length is 5',
                  },
                })}
              ></input>
            </div>
            {errors.password?.type === 'required' && (
              <div>Password - обязательное поле.</div>
            )}
            {errors.password && <div>{errors.password.message}</div>}
            {!errors.password && <div>Enter your password</div>}
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
