import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import camera from '../../img/Camera.png';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import { editPassValidationSchema } from '../../schemas/editPassValidationSchemf';
import ProfileInput from '../Input fields/ProfileInput';
import { ApiPath, DEFAULT_PASSWORD_STARS } from '../../constants/textConstants';
import {
  ERROR_AVATAR_UPLOAD,
  ERROR_UPDATE_USER_DATA,
  ERROR_UPDATE_USER_PASSWORD,
} from '../../constants/errorConstants';
import {
  saveBase64File,
  updateUserData,
  updateUserPassword,
} from '../../api/userApi';
import { setUser, logout } from '../../store/auth/authSlice';
import { convertFileToBase64 } from '../../utils/fileUtil';
import { UserType, IFormInfo, IFormPass } from '../../lib/authTypes';
import { cleanCart } from '../../store/cart/cartSlice';
import { cleanFav } from '../../store/favorites/favoritesSlice';
import Toast from '../Toast';
import BaseButton from '../BaseComponentsStyles/BaseButton';

const ProfileBody: React.FC<{ user: UserType | null }> = (props) => {
  const dispatch = useDispatch();
  const dirname = `${process.env.REACT_APP_BASE_URL}${ApiPath.avatarImg}`;

  const [changeInfo, setChangeInfo] = useState(true);
  const [changePass, setChangePass] = useState(true);
  const { user } = props;

  const {
    register: registerFormInfo,
    handleSubmit: handleSubmitFormInfo,
    formState: { errors: infoErrors },
    setValue: setValueInfo,
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
      const file = e.target.files[0];
      try {
        const base64 = await convertFileToBase64(file);
        const data = await saveBase64File(base64, 'avatar');
        dispatch(setUser({ avatar: data }));
      } catch (err) {
        console.error(ERROR_AVATAR_UPLOAD, err);
        Toast({ message: 'Upload error', error: err });
        return err;
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (user.fullName) {
        setValueInfo('fullName', user.fullName);
      }
      if (user.email) {
        setValueInfo('email', user.email);
      }
    }
  }, [user, setValueInfo]);

  const onSubmitFormInfo: SubmitHandler<IFormInfo> = async (data: {
    fullName?: string;
    email?: string;
  }) => {
    try {
      const updUser = await updateUserData(data);
      dispatch(setUser(updUser));
      Toast({ message: 'Data updated successfully' });
    } catch (err) {
      console.warn(ERROR_UPDATE_USER_DATA, err);
      Toast({ message: 'Error while update data', error: err });
    }
  };

  const onSubmitFormPass: SubmitHandler<IFormPass> = async (data: {
    password: string;
    passwordNew: string;
    passwordRep: string;
  }) => {
    try {
      updateUserPassword(data);
      Toast({ message: 'Password updated successfully' });
      resetPass();
    } catch (err) {
      console.warn(ERROR_UPDATE_USER_PASSWORD, err);
      Toast({ message: 'Error while update password', error: err });
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
    dispatch(cleanCart());
    dispatch(cleanFav());
  };

  return (
    <StyledWrapper>
      <ToastContainer />
      <div className="profile">
        <div className="profile__img">
          <img src={dirname + user?.avatar} alt="img" className="avatar"></img>
          <label className="base-round-button base-round-button--display">
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
        <BaseButton text={`Logout`} onClick={exit} />
      </div>

      <div className="container">
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
              disable={changeInfo}
              errors={infoErrors}
            />
            <ProfileInput
              img={mail}
              label="email"
              typeP="email"
              register={registerFormInfo}
              name="email"
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
              disable={changePass}
              errors={passErrors}
            />
            <ProfileInput
              img={hide}
              label="copy of new password"
              typeP="password"
              register={registerFormPass}
              name="passwordRep"
              disable={changePass}
              errors={passErrors}
            />
          </div>
        </form>
        <BaseButton
          buttonClassName="view"
          type="button"
          onClick={handleSubmit}
          style={{
            display:
              changeInfo === false || changePass === false ? 'block' : 'none',
          }}
          text={`Confirm`}
        />
      </div>
    </StyledWrapper>
  );
};

export default ProfileBody;

const StyledWrapper = styled.div`
  padding: 60px 0px 110px 80px;
  display: flex;
  flex-direction: row;
  align-items: start;
  column-gap: 128px;
  width: 100%;
  flex: 1;
  @media screen and (max-width: 834px) {
    padding: 95px 15px;
    column-gap: 20px;
  }
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: start;
    row-gap: 16px;
  }

  .profile__img {
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

  .container {
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

  .base-round-button--display {
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
