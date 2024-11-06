import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import hide from '../../img/Hide.png';
import { axiosInstance } from '../../axiosDefaul';
import { IFormPass } from '../../lib/types';
import { editPassValidationSchema } from '../../schemas/editPassValidationSchemf';
import Input from '../Input fields/ProfileInput';

const PassForm: React.FC = () => {
  const [changePass, setChangePass] = useState(true);

  const {
    register: registerFormPass,
    handleSubmit: handleSubmitFormPass,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm<IFormPass>({
    mode: 'onChange',
    resolver: yupResolver(editPassValidationSchema),
    defaultValues: {
      password: '*************',
      passwordNew: '',
      passwordRep: '',
    },
  });

  const handleChangePass = () => {
    setChangePass(!changePass);
  };

  const onSubmitFormPass: SubmitHandler<IFormPass> = async (data: {
    password: string;
    passwordNew: string;
    passwordRep: string;
  }) => {
    try {
      console.log('Данные отправлены на сервер!');

      const updUserPass = await axiosInstance.patch('/user/pass', {
        password: data.password,
        passwordNew: data.passwordNew,
      });
      console.log('Пароль был обновлен', updUserPass);
      resetPass();
    } catch (err) {
      console.warn('При обновлении пароля возникла ошибка: ', err);
    }
  };

  return (
    <StyledWrapper>
      <form className="info" onSubmit={handleSubmitFormPass(onSubmitFormPass)}>
        <div className="info">
          <div className="info__text">
            <div className="normal-title">Password</div>
            <div className="green-title" onClick={handleChangePass}>
              Change password
            </div>
          </div>
          <Input
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
          <Input
            img={hide}
            label="new password"
            typeP="password"
            register={registerFormPass}
            name="passwordNew"
            value=""
            disable={changePass}
            errors={passErrors}
          />
          <Input
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
    </StyledWrapper>
  );
};

export default PassForm;

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
