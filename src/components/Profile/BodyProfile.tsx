import React, { useState } from 'react';
import styled from 'styled-components';
import FormData from 'form-data';

import { CheckUser } from '../../actions/authActions';
import Input from '../Input fields/Input';
import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import camera from '../../img/Camera.png';
import { axiosInstance } from '../../axiosDefaul';
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../store/authSlice';

const Profile: React.FC = () => {
  const { user } = CheckUser();
  const dirname = `http://localhost:4000/uploads/`;
  const dispatch = useDispatch();
  const [changeInfo, setChangeInfo] = useState(true);
  const [changePass, setChangePass] = useState(true);

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

  const handleChangeInfo = () => {
    setChangeInfo(!changeInfo);
  };
  const handleChangePass = () => {
    setChangePass(!changePass);
  };
  const formData = new FormData();

  const handleUpdateInfo = async (e: any) => {
    const query = e.get('fullName');
    console.log('>>>>> ', query);
    // try {
    //   const response = await axiosInstance.patch('/user/me', {
    //     headers: {
    //       Autorization: `Bearer ${localStorage.getItem('access')}`,
    //     },
    //   });
    //   const uploadedFile = response.data.data.filename;
    //   dispatch(setAvatar(uploadedFile));
    //   console.log('Фото успешно загружено! ', uploadedFile, user?.avatar);
    // } catch (err) {
    //   console.error('Ошибка обновления данных: ', err);
    //   return err;
    // }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="profile-img">
          <img src={dirname + user?.avatar} alt="img" className="avatar"></img>
          <form method="post" encType="multipart/form-data">
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
          </form>
        </div>
        <form className="container__info-block" onSubmit={handleUpdateInfo}>
          <div className="info">
            <div className="info__text">
              <div className="normal-title">Personal information</div>
              <div className="green-title" onClick={handleChangeInfo}>
                Change information
              </div>
            </div>
            <Input
              img={man}
              typeP="text"
              id="text"
              name="fullName"
              placeholder={user?.fullName}
              isChangedInfo={changeInfo}
              isChangedPass={changePass}
            />
            <Input
              img={mail}
              typeP="email"
              id="email"
              name="email"
              placeholder={user?.email}
              isChangedInfo={changeInfo}
              isChangedPass={changePass}
            />
          </div>
          <div className="info">
            <div className="info__text">
              <div className="normal-title">Password</div>
              <div className="green-title" onClick={handleChangePass}>
                Change password
              </div>
            </div>
            <Input
              img={hide}
              typeP="password"
              id="password"
              name="password"
              placeholder={user?.password}
              isChangedPass={changePass}
              isChangedInfo={changeInfo}
            />
          </div>
          <button
            className="base-button view"
            type="submit"
            style={{
              display:
                changeInfo === false || changePass === false ? 'block' : 'none',
            }}
          >
            Confirm
          </button>
        </form>
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
`;
