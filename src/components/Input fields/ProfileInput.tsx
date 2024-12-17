import React, { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import { ProfileInputPropsType } from '../../lib/authTypes';

const ProfileInput: React.FC<ProfileInputPropsType> = (props) => {
  const [inputType, setInputType] = useState('password');
  const handlerInputType = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  let correctPassFlag = true;
  const { img, label, type, register, name, disable, errors } = props;

  const styleParams: React.CSSProperties | undefined = {
    display:
      disable === false && (name === 'passwordNew' || name === 'passwordRep')
        ? 'block'
        : name
        ? 'block'
        : 'none',
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'password' && correctPassFlag) {
      e.target.value = '';
      correctPassFlag = false;
    }
  };
  return (
    <StyledWrapper>
      <div className="input input__field --correct --size" style={styleParams}>
        {img && (
          <div
            className="password__btn active"
            onClick={
              type === 'password' && !disable ? handlerInputType : undefined
            }
          >
            <img src={img} alt={type} className="input__icon" />
          </div>
        )}
        <div className="input__text-block">
          {label && (
            <div className="input__dark-title input-title">Your {label}</div>
          )}
          <input
            type={type === 'password' ? inputType : type}
            {...(register && register(name))}
            onFocus={handlePass}
            disabled={disable}
            className={cn('input__field pad-inp', props.inputClassName)}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
          />
        </div>
      </div>

      {errors && <div className="error-message">{errors}</div>}
    </StyledWrapper>
  );
};

export default ProfileInput;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 9px;

  .input {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 64px;
    width: 100%;
  }

  .input__icon {
    position: absolute;
    padding: 22px 24px;
    @media screen and (max-width: 320px) {
      padding: 11px 16px;
    }
  }

  .input__field {
    display: flex;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    padding-left: 64px;
    max-width: 630px;
    width: 100%;
    height: auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;

    @media screen and (max-width: 834px) {
      max-width: 392px;
      height: 64px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      height: 47px;
      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
    }
  }
  .input__text-block {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
    height: auto;
  }

  .input__dark-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_blue};
  }
  .--size {
    width: 522px;
    height: 64px;
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 834px) {
      width: 529px;
    }
    @media screen and (max-width: 320px) {
      width: 290px;
    }
  }

  .input__text-block {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
  }

  .input-title {
    display: flex;
    justify-content: left;
    padding-left: 64px;
    padding-top: 6px;
    width: 100%;
  }

  .pad-inp {
    width: 448px;
    margin-left: 64px;
    padding-left: 5px;
    @media screen and (max-width: 834px) {
      width: 465px;
      height: 28px;
      border-radius: 16px;
    }
  }

  .--correct {
    padding-left: 0px;
  }

  .error-message {
    color: red;
  }
`;
