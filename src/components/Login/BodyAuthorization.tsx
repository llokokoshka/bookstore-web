import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginValidationSchema } from '../../schemas/loginValidationSchema';
import man from '../../assets/img/чел 1.png';
import mail from '../../assets/img/Mail.png';
import hide from '../../assets/img/Hide.png';
import { useAppDispatch } from '../../hooks';
import { AppPages } from '../../constants/textConstants';
import { loginUser } from '../../store/auth/authThunk';
import { IFormReg } from '../../lib/authTypes';
import Toast from '../Toast';
import BaseButton from '../BaseComponents/BaseButton';
import BaseInput from '../BaseComponents/BaseInput';

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
      } else {
        navigate(AppPages.login);
      }
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
          <div className="info-block__text">
            <div className="big-title">Log In</div>
            <BaseInput
              type="email"
              name="email"
              img={mail}
              placeholder="Email"
              register={register}
              errors={errors.email?.message}
            />
            <ToastContainer />
            <BaseInput
              type="password"
              name="password"
              img={hide}
              placeholder="Password"
              register={register}
              errors={errors.password?.message}
            />
          </div>
          <BaseButton text={`Log in`} type="submit" />
        </form>
        <img src={man} alt="man" className="container__img" />
      </div>
    </StyledWrapper>
  );
};

export default AuthorizationBody;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.base};
  @media screen and (max-width: 834px) {
    padding: 95px 15px;
  }
  @media screen and (max-width: 320px) {
    padding: 30px 15px;
  }
  .poster__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    @media screen and (max-width: 320px) {
      flex-direction: column;
      row-gap: 60px;
    }

    /* padding: 0 108px 0 98px; */
  }
  .container__img {
    @media screen and (max-width: 834px) {
      width: 390px;
      height: 333px;
    }
    @media screen and (max-width: 320px) {
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

  .error-message {
    color: red;
  }
`;
