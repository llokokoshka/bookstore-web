import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { registrationValidationSchema } from '../../schemas/registrationValidationSchema';
import man from '../../assets/img/чел 1.png';
import mail from '../../assets/img/Mail.png';
import hide from '../../assets/img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { regUser } from '../../store/auth/authThunk';
import Toast from '../Toast';
import BaseButton from '../BaseComponents/BaseButton';
import BaseInput from '../BaseComponents/BaseInput';
import { IFormReg } from '../../store/auth/authTypes';
import { IFormInput } from '../../lib/types';

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
      Toast({ message: 'Registration error', error: err });
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
            <BaseInput
              type="email"
              img={mail}
              placeholder="Email"
              name="email"
              register={register}
              errors={errors.email?.message}
            />

            <BaseInput
              type={inputType}
              img={hide}
              placeholder="Password"
              name="password"
              register={register}
              errors={errors.password?.message}
              inputClassName='"password__btn active'
              onClick={changeInputTypeHandler}
            />
            <BaseInput
              type={inputType}
              img={hide}
              placeholder="Password replay"
              name="passwordRep"
              register={register}
              errors={errors.passwordRep?.message}
              inputClassName='"password__btn active'
              onClick={changeInputTypeHandler}
            />
            <ToastContainer />
          </div>
          <BaseButton type="submit" text="Sign up" />
        </form>
        <img src={man} alt="man" className="container__img" />
      </div>
    </StyledWrapper>
  );
};

export default RegistrationBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.base};
  ${({ theme }) => theme.media.tablet} {
    padding: 95px 15px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 15px;
  }
  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
      row-gap: 60px;
    }
  }

  .container__img {
    ${({ theme }) => theme.media.tablet} {
      width: 390px;
      height: 333px;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 290px;
      height: 247px;
    }
  }

  .container__info-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 50px;
    max-width: 413px;
    width: 100%;
  }

  .info-block__text {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 413px;
    width: 100%;
  }
  .error {
    color: #ff0000;
  }
`;
