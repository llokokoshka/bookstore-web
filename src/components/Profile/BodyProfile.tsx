import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import camera from '../../img/Camera.png';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import { editPassValidationSchema } from '../../schemas/editPassValidationSchemf';
import { ApiPath, DEFAULT_PASSWORD_STARS } from '../../constants/textConstants';
import {
  ERROR_AVATAR_UPLOAD,
  ERROR_UPDATE_USER_DATA,
  ERROR_UPDATE_USER_PASSWORD,
} from '../../constants/errorConstants';
import { saveBase64File } from '../../api/userApi';
import { setUser, logout } from '../../store/auth/authSlice';
import { convertFileToBase64 } from '../../utils/fileUtil';
import { UserType, IFormInfo, IFormPass } from '../../lib/authTypes';
import { cleanCart } from '../../store/cart/cartSlice';
import { cleanFav } from '../../store/favorites/favoritesSlice';
import Toast from '../Toast';
import BaseButton from '../BaseComponents/BaseButton';
import ProfileInfoForm from './ProfileInfoForm';
import ProfilePassForm from './ProfilePassForm';
import {
  updateUserDataThunk,
  updateUserPasswordThunk,
} from '../../store/auth/authThunk';
import { useAppDispatch } from '../../hooks';

const ProfileBody: React.FC<{ user: UserType | null }> = (props) => {
  const dispatch = useAppDispatch();
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
        Toast({ message: 'Avatar was updated!' });
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
      await dispatch(
        updateUserDataThunk({ fullName: data.fullName, email: data.email })
      ).unwrap();
      handleChangeInfo();
      Toast({ message: 'Data updated successfully' });
    } catch (err) {
      console.warn(ERROR_UPDATE_USER_DATA, err);
      console.log(err);

      Toast({ message: 'Error while update data', error: err });
    }
  };

  const onSubmitFormPass: SubmitHandler<IFormPass> = async (data: {
    password: string;
    passwordNew: string;
    passwordRep: string;
  }) => {
    try {
      await dispatch(updateUserPasswordThunk(data)).unwrap();
      handleChangePass();
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
  const editValueName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUser({
        fullName: e.target.value,
      })
    );
  };
  const editValueMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUser({
        email: e.target.value,
      })
    );
  };

  return (
    <StyledWrapper>
      <div className="profile">
        <div className="profile__img">
          <img src={dirname + user?.avatar} alt="img" className="avatar"></img>
          <label className="avatar-button">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpdateAvatar}
            />
            <img src={camera} alt="camera" className="correct-size" />
          </label>
        </div>
        <BaseButton text={`Logout`} onClick={exit} />
      </div>

      <div className="container">
        <ProfileInfoForm
          user={props.user}
          changeInfo={changeInfo}
          editValueMail={editValueMail}
          editValueName={editValueName}
          handleChangeInfo={handleChangeInfo}
          onSubmitFormInfo={onSubmitFormInfo}
          handleSubmitFormInfo={handleSubmitFormInfo}
          infoErrors={infoErrors}
          registerFormInfo={registerFormInfo}
        />
        <ProfilePassForm
          changePass={changePass}
          handleChangePass={handleChangePass}
          onSubmitFormPass={onSubmitFormPass}
          user={props.user}
          handleSubmitFormPass={handleSubmitFormPass}
          passErrors={passErrors}
          registerFormPass={registerFormPass}
        />
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
      <ToastContainer />
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
    padding: 50px 15px 40px 15px;
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

  .avatar-button {
    width: 48px;
    height: 48px;
    opacity: 0px;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 77.7%;
    left: 77.7%;
    @media screen and (max-width: 320px) {
      width: 32.73px;
      height: 32.73px;
      top: 83%;
      left: 83%;
    }
  }

  .avatar-button:hover {
    cursor: pointer;
  }

  .correct-size {
    width: 22px;
    height: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    width: 100%;
    @media screen and (max-width: 320px) {
      padding-top: 20px;
    }
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
  .pass-inputs {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
