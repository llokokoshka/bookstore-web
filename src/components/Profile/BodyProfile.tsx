import React, { useState } from 'react';
import styled from 'styled-components';
import FormData from 'form-data';

import { CheckUser } from '../../actions/authActions';
import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import camera from '../../img/Camera.png';
import { axiosInstance } from '../../axiosDefaul';
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../store/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormPass, IFormInfo } from '../../lib/actionTypes';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPassValidationSchema } from '../../schemas/editPassValidationSchemf';

const Profile: React.FC = () => {
  const { user } = CheckUser();
  const dirname = `http://localhost:4000/uploads/`;
  const dispatch = useDispatch();
  const [changeInfo, setChangeInfo] = useState(true);
  const [changePass, setChangePass] = useState(true);
  const [inputType, setInputType] = useState('password');

  const {
    register: registerFormInfo,
    handleSubmit: handleSubmitFormInfo,
    reset: resetInfo,
    formState: { errors: infoErrors },
    // setValue: setValueInfo,
    // watch: watchInfo,
  } = useForm<IFormInfo>({
    mode: 'onChange',
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerFormPass,
    handleSubmit: handleSubmitFormPass,
    reset: resetPass,
    formState: { errors: passErrors },
    // setValue: setValuePass,
    // watch: watchPass,
  } = useForm<IFormPass>({
    mode: 'onChange',
    resolver: yupResolver(editPassValidationSchema),
    defaultValues: {
      password: '',
      passwordNew: '',
      passwordRep: '',
    },
  });

  const handlerInputType = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

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
        const response = await axiosInstance.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Autorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        const uploadedFile = response.data.data.filename;
        dispatch(setAvatar(uploadedFile));
        console.log('Фото успешно загружено! ', uploadedFile, user?.avatar);
      } catch (err) {
        console.error('Ошибка загрузки фото: ', err);
        return err;
      }
    }
  };

  const onSubmitFormInfo: SubmitHandler<IFormInfo> = async (data: {
    fullName?: string;
    email?: string;
  }) => {
    console.log('FormInfo data >>>>> ', data);
    try {
      console.log('Данные отправлены на сервер!');

      const updUser = await axiosInstance.patch('/user/me', {
        fullName: data.fullName,
        email: data.email,
      });
      console.log('Данные пользователя были обновлены', updUser);

      resetInfo();
    } catch (err) {
      console.warn('При обновлении данных возникла ошибка: ', err);
    }
  };

  const onSubmitFormPass: SubmitHandler<IFormPass> = async (data: {
    password: string;
    passwordNew: string;
    passwordRep: string;
  }) => {
    console.log('FormPass data >>>>> ', data);
    try {
      console.log('Данные отправлены на сервер!');

      const updUserPass = await axiosInstance.patch('/user/pass', {
        password: data.password,
        passwordNew: data.passwordNew,
        passwordRep: data.passwordRep,
      });
      console.log('Пароль был обновлен', updUserPass);

      resetPass();
    } catch (err) {
      console.warn('При обновлении пароля возникла ошибка: ', err);
    }
  };

  const handleSubmit = () => {
    if (changeInfo === false) {
      handleSubmitFormInfo((data) => onSubmitFormInfo(data))();
    }
    if (changePass === false) {
      console.log('Данные пароля отправлются для изменения');
      handleSubmitFormPass((data) => {
        console.log(data);
        onSubmitFormPass(data);
      })();
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="profile-img">
          <img src={dirname + user?.avatar} alt="img" className="avatar"></img>
          {/* <form method="post" encType="multipart/form-data"> */}
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
          {/* </form> */}
        </div>
        <div>
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
              <div className="input input__field correct">
                <div className="password__btn active">
                  <img src={man} alt="man" className="input__icon" />
                </div>
                <div className="input__text-block">
                  <div className="input__dark-title input-title">
                    Your full name
                  </div>
                  <input
                    type="text"
                    className="input__field"
                    {...registerFormInfo('fullName')}
                    disabled={changeInfo}
                  />
                </div>
              </div>
              {infoErrors.fullName?.type === 'required' && (
                <div>Full Name - обязательное поле.</div>
              )}

              {infoErrors.fullName ? (
                <div>{infoErrors.fullName.message}</div>
              ) : (
                <div>Enter your full name</div>
              )}
              <div className="input input__field correct">
                <div className="password__btn active">
                  <img src={mail} alt="mail" className="input__icon" />
                </div>
                <div className="input__text-block">
                  <div className="input__dark-title input-title">
                    Your email
                  </div>
                  <input
                    type="email"
                    className="input__field"
                    {...registerFormInfo('email')}
                    disabled={changeInfo}
                  />
                </div>
              </div>
              {infoErrors.email?.type === 'required' && (
                <div>Email - обязательное поле.</div>
              )}

              {infoErrors.email ? (
                <div>{infoErrors.email.message}</div>
              ) : (
                <div>Enter your email</div>
              )}
            </div>
          </form>
          <form
            className="container__info-block"
            onSubmit={handleSubmitFormPass(onSubmitFormPass)}
          >
            <div className="info">
              <div className="info__text">
                <div className="normal-title">Password</div>
                <div className="green-title" onClick={handleChangePass}>
                  Change password
                </div>
              </div>
              <div className="input input__field correct">
                <div
                  className="password__btn active"
                  onClick={handlerInputType}
                >
                  <img src={hide} alt="hide" className="input__icon" />
                </div>
                <div className="input__text-block">
                  <div className="input__dark-title input-title">
                    Your password
                  </div>
                  <input
                    type={inputType}
                    className="input__field"
                    {...registerFormPass('password')}
                    disabled={changePass}
                  />
                </div>
              </div>
              {passErrors.password?.type === 'required' && (
                <div>Password - обязательное поле.</div>
              )}

              {passErrors.password ? (
                <div>{passErrors.password.message}</div>
              ) : (
                <div>Enter your password</div>
              )}
            </div>
            <div>
              <div
                className="input input__field correct"
                style={{ display: changePass === false ? 'block' : 'none' }}
              >
                <div
                  className="password__btn active"
                  onClick={handlerInputType}
                >
                  <img src={hide} alt="hide" className="input__icon" />
                </div>
                <div className="input__text-block">
                  <div className="input__dark-title input-title">
                    Your new password
                  </div>
                  <input
                    type={inputType}
                    className="input__field"
                    {...registerFormPass('password')}
                  />
                </div>
              </div>
              {passErrors.password?.type === 'required' && (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  Password - обязательное поле.
                </div>
              )}

              {passErrors.password ? (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  {passErrors.password.message}
                </div>
              ) : (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  Enter your password
                </div>
              )}
              <div
                className="input input__field correct"
                style={{ display: changePass === false ? 'block' : 'none' }}
              >
                <div
                  className="password__btn active"
                  onClick={handlerInputType}
                >
                  <img src={hide} alt="hide" className="input__icon" />
                </div>
                <div className="input__text-block">
                  <div className="input__dark-title input-title">
                    Your password
                  </div>
                  <input
                    type={inputType}
                    className="input__field"
                    {...registerFormPass('password')}
                  />
                </div>
              </div>
              {passErrors.password?.type === 'required' && (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  Password - обязательное поле.
                </div>
              )}

              {passErrors.password ? (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  {passErrors.password.message}
                </div>
              ) : (
                <div
                  style={{ display: changePass === false ? 'block' : 'none' }}
                >
                  Enter your password
                </div>
              )}
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
    width: 100%;
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

  .profile-img {
    position: relative;
    width: 305px;
    height: 305px;
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url({defImg});
    @media screen and (max-width: 834px) {
      max-width: 255px;
      max-height: 255px;
    }
  }

  .avatar {
    max-width: 305px;
    max-height: 305px;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 834px) {
      max-width: 255px;
      max-height: 255px;
    }
  }

  .lable-nice {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .size {
    max-width: 522px;
    height: 64px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .input-title {
    display: flex;
    justify-content: left;
    padding-left: 64px;
    padding-top: 6px;
    width: 100%;
  }
  .input__text-block {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
  }
  .correct {
    padding-left: 0px;
  }
`;
