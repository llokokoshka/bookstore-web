import React, { useState } from 'react';
import styled from 'styled-components';

import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';

import { axiosInstance } from '../../axiosDefaul';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInfo } from '../../lib/actionTypes';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../Input fields/ProfileInput';
import { useAppSelector } from '../../hooks';

const InfoForm: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [changeInfo, setChangeInfo] = useState(true);

  const {
    register: registerFormInfo,
    handleSubmit: handleSubmitFormInfo,
    reset: resetInfo,
    formState: { errors: infoErrors },
  } = useForm<IFormInfo>({
    mode: 'onChange',
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const handleChangeInfo = () => {
    setChangeInfo(!changeInfo);
  };

  const onSubmitFormInfo: SubmitHandler<IFormInfo> = async (data: {
    fullName?: string;
    email?: string;
  }) => {
    try {
      console.log('Данные отправлены на сервер!');

      const updUser = await axiosInstance.patch('/user/me', {
        fullName: data?.fullName,
        email: data?.email,
      });
      console.log('Данные пользователя были обновлены', updUser);
      dispatch(
        setUser({
          fullName: updUser.data?.fullName,
          email: updUser.data?.email,
        })
      );
      resetInfo();
    } catch (err) {
      console.warn('При обновлении данных возникла ошибка: ', err);
    }
  };

  return (
    <StyledWrapper>
      <form
        className="container__info-block"
        onSubmit={handleSubmitFormInfo(onSubmitFormInfo)}
      >
        <div className="info">
          <div className="info__text">
            <div className="normal-title">Personal information</div>
            <div className="green-title" onClick={handleChangeInfo}>
              Change information
            </div>
          </div>
          <Input
            img={man}
            label="full name"
            typeP="text"
            register={registerFormInfo}
            name="fullName"
            value={user?.fullName}
            disable={changeInfo}
            errors={infoErrors}
          />
          <Input
            img={mail}
            label="email"
            typeP="email"
            register={registerFormInfo}
            name="email"
            value={user?.email}
            disable={changeInfo}
            errors={infoErrors}
          />
        </div>
      </form>
    </StyledWrapper>
  );
};

export default InfoForm;

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.padding.header};
  display: flex;
  flex-direction: row;
  align-items: start;
  column-gap: 128px;
  width: 100%;
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }

  .profile-img {
    position: relative;
    max-width: 305px;
    height: auto;
    width: 100%;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.light};

    @media screen and (max-width: 834px) {
      max-width: 255px;
      max-height: 255px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      max-height: 290px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
  }

  .info__text {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 16px;

    @media screen and (max-width: 834px) {
      max-width: 255px;
      max-height: 255px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      max-height: 290px;
    }
  }

  .lable-nice {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 77.7%;
    left: 77.7%;
  }
  .pass-inputs {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
