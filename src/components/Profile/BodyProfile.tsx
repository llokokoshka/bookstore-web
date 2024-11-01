import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormData from 'form-data';

import { CheckUser } from '../../actions/authActions';
import Input from '../Input fields/Inpit';
import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import hide from '../../img/Hide.png';
import camera from '../../img/Camera.png';
import defImg from '../../img/image.png';
import { axiosInstance } from '../../axiosDefaul';
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../store/authSlice';

const Profile: React.FC = () => {
  const { user } = CheckUser();
  const dirname = `http://localhost:4000/uploads/`;
  const dispatch = useDispatch();

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

  return (
    <StyledWrapper>
      <div className="container">
        <div className="profile-img">
          <img src={dirname + user?.avatar} alt="img" className="imgg"></img>
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
        <form method="post" className="container__info-block">
          <div className="info">
            <div className="info__text">
              <div className="normal-title">Personal information</div>
              <div className="green-title">Change information</div>
            </div>
            <Input
              img={man}
              typeP="text"
              id="text"
              placeholder={user?.fullName}
            />
            <Input
              img={mail}
              typeP="email"
              id="email"
              placeholder={user?.email}
            />
          </div>
          <div className="info">
            <div className="info__text">
              <div className="normal-title">Password</div>
              <div className="green-title">Change password</div>
            </div>
            <Input
              img={hide}
              typeP="password"
              id="password"
              placeholder={user?.password}
            />
          </div>
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
    position: relative;
    width: 305px;
    height: 305px;
    background-color: ${({ theme }) => theme.colors.light};
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url({defImg});
  }

  .lable-nice {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
