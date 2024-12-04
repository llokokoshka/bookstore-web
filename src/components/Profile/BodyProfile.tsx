import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';

import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import camera from '../../img/Camera.png';
import { IFormPass, IFormInfo } from '../../lib/types';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import { editPassValidationSchema } from '../../schemas/editPassValidationSchemf';
import ProfileInput from '../Input fields/ProfileInput';
import { useAppSelector } from '../../hooks';
import { ApiPath, DEFAULT_PASSWORD_STARS } from '../../constants/textConstants';
import {
  ERROR_AVATAR_UPLOAD,
  ERROR_UPDATE_USER_DATA,
  ERROR_UPDATE_USER_PASSWORD,
} from '../../constants/errorConstants';
import {
  saveFile,
  updateUserData,
  updateUserPassword,
} from '../../api/userApi';
import { logout, setUser } from '../../store/authSlice';

const ProfileBody: React.FC = () => {
  const dispatch = useDispatch();
  const [changeInfo, setChangeInfo] = useState(true);
  const [changePass, setChangePass] = useState(true);

  const user = useAppSelector((state) => state.auth.user);

  const dirname = `${process.env.REACT_APP_BASE_URL}${ApiPath.avatarImg}`;

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

  const {
    register: registerFormPass,
    handleSubmit: handleSubmitFormPass,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm<IFormPass>({
    mode: 'onChange',
    resolver: yupResolver(editPassValidationSchema),
    defaultValues: {
      password: DEFAULT_PASSWORD_STARS,
      passwordNew: '',
      passwordRep: '',
    },
  });

  const handleChangeInfo = () => {
    setChangeInfo(!changeInfo);
  };

  const handleChangePass = () => {
    setChangePass(!changePass);
  };

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      try {
        const data = await saveFile(formData);
        dispatch(setUser({ avatar: data }));
      } catch (err) {
        console.error(ERROR_AVATAR_UPLOAD, err);
        return err;
      }
    }
  };

  const onSubmitFormInfo: SubmitHandler<IFormInfo> = async (data: {
    fullName?: string;
    email?: string;
  }) => {
    try {
      const updUser = await updateUserData(data);
      dispatch(
        setUser({
          fullName: updUser.data?.fullName,
          email: updUser.data?.email,
        })
      );
      resetInfo();
    } catch (err) {
      console.warn(ERROR_UPDATE_USER_DATA, err);
    }
  };

  const onSubmitFormPass: SubmitHandler<IFormPass> = async (data: {
    password: string;
    passwordNew: string;
    passwordRep: string;
  }) => {
    try {
      updateUserPassword(data);
      resetPass();
    } catch (err) {
      console.warn(ERROR_UPDATE_USER_PASSWORD, err);
    }
  };

  const handleSubmit = () => {
    if (changeInfo === false) {
      handleSubmitFormInfo((data) => onSubmitFormInfo(data))();
    }
    if (changePass === false) {
      handleSubmitFormPass((data) => {
        onSubmitFormPass(data);
      })();
    }
  };
  const exit = () => {
    dispatch(logout());
  };

  return (
    <StyledWrapper>
      <div>
        <div className="profile-img">
          <img src={dirname + user?.avatar} alt="img" className="avatar"></img>
          <label className="base-round-button lable-nice">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpdateAvatar}
            />
            <img src={camera} alt="camera" />
          </label>
        </div>
        <button className="base-button" onClick={exit}>
          Logout
        </button>
      </div>

      <div className="inputs">
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
            <ProfileInput
              img={man}
              label="full name"
              typeP="text"
              register={registerFormInfo}
              name="fullName"
              value={user?.fullName}
              disable={changeInfo}
              errors={infoErrors}
            />
            <ProfileInput
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
        <form
          className="info"
          onSubmit={handleSubmitFormPass(onSubmitFormPass)}
        >
          <div className="info">
            <div className="info__text">
              <div className="normal-title">Password</div>
              <div className="green-title" onClick={handleChangePass}>
                Change password
              </div>
            </div>
            <ProfileInput
              img={hide}
              label="password"
              typeP="password"
              register={registerFormPass}
              name="password"
              value="******************"
              disable={changePass}
              errors={passErrors}
            />
          </div>
          <div className="pass-inputs">
            <ProfileInput
              img={hide}
              label="new password"
              typeP="password"
              register={registerFormPass}
              name="passwordNew"
              value=""
              disable={changePass}
              errors={passErrors}
            />
            <ProfileInput
              img={hide}
              label="copy of new password"
              typeP="password"
              register={registerFormPass}
              name="passwordRep"
              value=""
              disable={changePass}
              errors={passErrors}
            />
          </div>
        </form>
        <button
          className="base-button view"
          type="button"
          style={{
            display:
              changeInfo === false || changePass === false ? 'block' : 'none',
          }}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </StyledWrapper>
  );
};

export default ProfileBody;

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
