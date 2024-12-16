import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { registrationValidationSchema } from '../../schemas/registrationValidationSchema';
import man from '../../img/чел 1.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { regUser } from '../../store/auth/authThunk';
import { IFormInput, IFormReg } from '../../lib/authTypes';
import { BaseInput } from '../BaseComponentsStyles/BaseInput';

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
      const responseData = await dispatch(
        regUser({ email: data.email, password: data.password })
      ).unwrap();
      if (responseData.user) {
        navigate(AppPages.profile);
      }
      reset();
    } catch (err) {
      console.error('Registration error: ', err);
      toast.error(`Registration error: ${err}`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
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
            <div className="big-title">Sign up</div>
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
              <div className="error">Email - обязательное поле.</div>
            )}
            {errors.email && (
              <div className="error">{errors.email.message}</div>
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
              <div className="error">Password - обязательное поле.</div>
            )}
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
            {!errors.password && <div>Enter your password</div>}
            <BaseInput>
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
            </BaseInput>
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
        <img src={man} alt="man" className="container__img" />
      </div>
    </StyledWrapper>
  );
};

export default RegistrationBody;

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
  .error {
    color: #ff0000;
  }
`;
