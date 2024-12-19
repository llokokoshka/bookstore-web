import React from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from 'react-hook-form';
import styled from 'styled-components';

import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import ProfileInput from '../Input fields/ProfileInput';
import { UserType, IFormInfo } from '../../lib/authTypes';

interface Props {
  user: UserType | null;
  onSubmitFormInfo: SubmitHandler<IFormInfo>;
  handleChangeInfo: () => void;
  changeInfo: boolean;
  editValueName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editValueMail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitFormInfo: (
    onValid: SubmitHandler<IFormInfo>,
    onInvalid?: SubmitErrorHandler<IFormInfo> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  registerFormInfo: UseFormRegister<IFormInfo>;
  infoErrors: FieldErrors<IFormInfo>;
}

const ProfileInfoForm: React.FC<Props> = (props) => {
  return (
    <StyledWrapper
      onSubmit={props.handleSubmitFormInfo(props.onSubmitFormInfo)}
    >
      <div className="info__text">
        <div className="normal-title">Personal information</div>
        <div className="green-title" onClick={props.handleChangeInfo}>
          Change information
        </div>
      </div>
      <ProfileInput
        img={man}
        label="full name"
        type="text"
        register={props.registerFormInfo}
        name="fullName"
        disable={props.changeInfo}
        errors={props.infoErrors.fullName?.message}
        onChange={props.editValueName}
        isProfile={true}
      />
      <ProfileInput
        img={mail}
        label="email"
        type="email"
        register={props.registerFormInfo}
        name="email"
        disable={props.changeInfo}
        errors={props.infoErrors.email?.message}
        onChange={props.editValueMail}
        isProfile={true}
      />
    </StyledWrapper>
  );
};

export default ProfileInfoForm;

const StyledWrapper = styled.form`
  /* @media screen and (max-width: 834px) {
      margin-bottom: 118px;
      margin-right: 1px;
    } */

  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 630px;
  width: 100%;

  .info__text {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    @media screen and (max-width: 320px) {
      flex-direction: column;
    }
  }
`;
