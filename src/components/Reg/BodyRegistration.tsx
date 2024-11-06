import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { registrationValidationSchema } from '../../schemas/registrationValidationSchema';
import { regUser } from '../../store/thunk';
import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { IFormReg, IFormInput } from '../../lib/types';

const RegistrationBody: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(registrationValidationSchema),
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
      const user = await dispatch(
        regUser({ email: data.email, password: data.password })
      );
      if (user.payload) {
        navigate('/me');
      }
      reset();
    } catch (err) {
      console.warn('При регистрации возникла ошибка: ', err);
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
            <div className="big-title">Sign up</div>
            <div className="input">
              <img src={mail} alt="Email" className="input__icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input__field"
                {...register('email')}
              />
            </div>
            {errors.email?.type === 'required' && (
              <div className="error">Email - обязательное поле.</div>
            )}
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
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
                {...register('password')}
              ></input>
            </div>
            {errors.password?.type === 'required' && (
              <div className="error">Password - обязательное поле.</div>
            )}
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
            {!errors.password && <div>Enter your password</div>}
            <div className="input">
              <div
                className="password__btn active"
                onClick={changeInputTypeHandler}
              >
                <img src={hide} alt="Password" className="input__icon" />
              </div>
              <input
                type={inputType}
                placeholder="Password replay"
                className="input__field"
                autoComplete="false"
                {...register('passwordRep')}
              ></input>
            </div>
            {errors.passwordRep?.type === 'required' && (
              <div className="error">Password - обязательное поле.</div>
            )}
            {errors.passwordRep && (
              <div className="error">{errors.passwordRep.message}</div>
            )}
            {!errors.passwordRep && (
              <div>Repeat your password without errors</div>
            )}
          </div>
          <button className="base-button" type="submit">
            Sign up
          </button>
        </form>
        <img src={man} alt="man" />
      </div>
    </StyledWrapper>
  );
};

export default RegistrationBody;

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
  .error {
    color: #ff0000;
  }
`;
