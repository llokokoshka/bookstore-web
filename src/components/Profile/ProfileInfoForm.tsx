import React from 'react';
import styled from 'styled-components';

import man from '../../img/User profile.png';
import mail from '../../img/Mail.png';
import BaseInput from '../BaseComponentsStyles/BaseInput';
import { IProfileInfoFormProps } from '../../lib/types';

const ProfileInfoForm: React.FC<IProfileInfoFormProps> = (props) => {
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
      <BaseInput
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
      <BaseInput
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
