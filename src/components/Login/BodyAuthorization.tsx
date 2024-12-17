import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginValidationSchema } from '../../schemas/loginValidationSchema';
import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { loginUser } from '../../store/auth/authThunk';
import { IFormReg } from '../../lib/authTypes';
import { BaseInput } from '../BaseComponentsStyles/BaseInput';
import Toast from '../Toast';

const AuthorizationBody: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormReg>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const [inputType, setInputType] = useState('password');

  const changeInputTypeHandler = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const onSubmit: SubmitHandler<IFormReg> = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const responseData = await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      if (responseData.user) {
        navigate(AppPages.profile);
      } else navigate(AppPages.login);
      reset();
    } catch (err) {
      console.warn('Authorization error: ', err);
      Toast({ message: 'Authorization error', error: err });
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
          <ToastContainer />

          <div className="info-block__text">
            <div className="big-title">Log In</div>
            <BaseInput>
              <img src={mail} alt="Email" className="input__icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input__field"
                {...register('email')}
              />
            </BaseInput>
            {errors.email?.type === 'required' && (
              <div className="error-message">Email - обязательное поле.</div>
            )}
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
            {!errors.email && <div>Enter your email</div>}
            <BaseInput>
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
                {...register('password')}
              ></input>
            </BaseInput>
            {errors.password?.type === 'required' && (
              <div className="error-message">Password - обязательное поле.</div>
            )}
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
            {!errors.password && <div>Enter your password</div>}
          </div>
          <button className="base-button" type="submit">
            Log in
          </button>
        </form>
        <img src={man} alt="man" className="container__img" />
      </div>
    </StyledWrapper>
  );
};

export default AuthorizationBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  @media screen and (max-width: 834px) {
    padding: 95px 15px;
  }
  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    /* padding: 0 108px 0 98px; */
  }
  .container__img {
    @media screen and (max-width: 834px) {
      width: 390px;
      height: 333px;
    }
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

  .error-message {
    color: red;
  }
`;
