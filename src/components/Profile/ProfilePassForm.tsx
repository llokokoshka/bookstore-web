import React from 'react';
import styled from 'styled-components';

import hide from '../../assets/img/Hide.png';
import BaseInput from '../BaseComponents/BaseInput';
import { IProfilePassFormProps } from '../../lib/types';

const ProfilePassForm: React.FC<IProfilePassFormProps> = (props) => {
  return (
    <StyledWrapper
      onSubmit={props.handleSubmitFormPass(props.onSubmitFormPass)}
    >
      <div className="info">
        <div className="info__text">
          <div className="normal-title">Password</div>
          <div className="green-title" onClick={props.handleChangePass}>
            Change password
          </div>
        </div>
        <BaseInput
          img={hide}
          label="password"
          type="password"
          register={props.registerFormPass}
          name="password"
          disable={props.changePass}
          errors={props.passErrors.password?.message}
          isProfile={true}
        />
      </div>
      <div className="pass-inputs">
        <BaseInput
          img={hide}
          label="new password"
          type="password"
          register={props.registerFormPass}
          name="passwordNew"
          disable={props.changePass}
          errors={props.passErrors.passwordNew?.message}
          isProfile={true}
        />
        <BaseInput
          img={hide}
          label="copy of new password"
          type="password"
          register={props.registerFormPass}
          name="passwordRep"
          disable={props.changePass}
          errors={props.passErrors.passwordRep?.message}
          isProfile={true}
        />
      </div>
    </StyledWrapper>
  );
};

export default ProfilePassForm;

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 630px;
  width: 100%;

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

  .pass-inputs {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
