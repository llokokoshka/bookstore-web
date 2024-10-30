import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginValidationSchema } from '../../schemas/loginValidationSchema';
import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import defImg from '../../img/deg img User profile.png';
import camera from '../../img/Camera.png';
import { useAppSelector } from '../../hooks';
import { IFormReg } from '../../lib/actionTypes';

const Profile: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<IFormReg>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const [inputType, setInputType] = useState('password');

  const changeInputTypeHandler = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const user = useAppSelector((state) => state.auth.user);

  return (
    <StyledWrapper>
      <div className="container">
        {user ? (
          <>
            <div className="profile-img">
              <img src={defImg} alt="default img" className="imgg"></img>
              <button className="base-round-button">
                <img src={camera} alt="camera" />
              </button>
            </div>
            <form method="post" className="container__info-block">
              <div className="info">
                <div className="info__text">
                  <div className="big-title">Personal information</div>
                  <div className="green-title">Change information</div>
                </div>

                <div className="input">
                  <img src={man} alt="profile" className="input__icon" />
                  <input
                    type="text"
                    id="text"
                    placeholder={user.fullName}
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
                  <img src={mail} alt="Email" className="input__icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder={user.email}
                    className="input__field"
                    {...register('email')}
                  />
                </div>
                {errors.email?.type === 'required' && (
                  <div>Email - обязательное поле.</div>
                )}
                {errors.email && <div>{errors.email.message}</div>}
                {!errors.email && <div>Enter your email</div>}
              </div>
              <div className="info">
                <div className="info__text">
                  <div className="big-title">Password</div>
                  <div className="green-title">Change password</div>
                </div>

                <div className="input">
                  <div
                    className="password__btn active"
                    onClick={changeInputTypeHandler}
                  >
                    <img src={hide} alt="Password" className="input__icon" />
                  </div>
                  <input
                    type={inputType}
                    placeholder={user.password}
                    className="input__field"
                    autoComplete="false"
                    {...register('password')}
                  ></input>
                </div>
                {errors.password?.type === 'required' && (
                  <div>Password - обязательное поле.</div>
                )}
                {errors.password && <div>{errors.password.message}</div>}
                {!errors.password && <div>Enter your password</div>}
              </div>
            </form>
          </>
        ) : (
          <div> Данные пользователя не найдены!</div>
        )}
      </div>
    </StyledWrapper>
  );
};

export default Profile;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};

  .container {
    display: flex;
    flex-direction: row;
    align-items: start;
    column-gap: 128px;
  }
  .info {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .info__text {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
  .profile-img {
    width: 305px;
    height: 305px;
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
  }
`;
