import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginValidationSchema } from '../../schemas/loginValidationSchema';
import { loginUser } from '../../actions/authActions';
import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { IFormReg } from '../../lib/actionTypes';

const Profile: React.FC = () => {
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
      console.log('Валидация прошла успешно!');
      // const user = await dispatch();
      // loginUser({ email: data.email, password: data.password })
      // if (user.payload) {
      //   navigate('/');
      // }
      reset();
    } catch (err) {
      console.warn('При авторизации возникла ошибка: ', err);
    }
  };

  return (
    <StyledWrapper>
      <form
        method="post"
        className="container__info-block"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="info-block__text">
          <div className="big-title">Personal information</div>
          <div className="input">
            <img src={man} alt="profile" className="input__icon" />
            <input
              type="text"
              id="text"
              placeholder="Your name"
              className="input__field"
              // {...register('email')}
            />
          </div>
          {/* {errors.email?.type === 'required' && (
            <div>Email - обязательное поле.</div>
          )}
          {errors.email && <div>{errors.email.message}</div>}
          {!errors.email && <div>Enter your email</div>} */}
          <div className="input">
            <div
              className="password__btn active"
              onClick={changeInputTypeHandler}
            >
              <img src={mail} alt="email" className="input__icon" />
            </div>
            <input
              type="email"
              placeholder="email"
              className="input__field"
              // autoComplete="false"
              // {...register('password')}
            ></input>
          </div>
          {/* {errors.password?.type === 'required' && (
            <div>Password - обязательное поле.</div>
          )}
          {errors.password && <div>{errors.password.message}</div>}
          {!errors.password && <div>Enter your password</div>} */}
        </div>
        <button className="base-button" type="submit">
          Log in
        </button>
      </form>
    </StyledWrapper>
  );
};

export default Profile;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
`;
