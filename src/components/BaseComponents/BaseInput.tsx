import React, { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

type Props = {
  type: string;
  img?: string;
  label?: string;
  inputClassName?: string;
  disable?: boolean;
  register?: any;
  name?: string;
  errors?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e?: any) => void;
  onKeyUp?: (e?: any) => void;
  onClick?: () => void;
  isProfile?: boolean;
  text?: string;
};

const BaseInput: React.FC<Props> = (props) => {
  const [inputType, setInputType] = useState('password');
  const handlerInputType = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  let correctPassFlag = true;
  const { img, label, type, register, name, disable, errors } = props;

  const styleParams: React.CSSProperties | undefined = {
    display:
      (name === 'passwordNew' || name === 'passwordRep') &&
      disable === false &&
      props.isProfile
        ? 'block'
        : !(name === 'passwordNew' || name === 'passwordRep') ||
          !props.isProfile
        ? 'block'
        : 'none',
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'password' && correctPassFlag) {
      e.target.value = '';
      correctPassFlag = false;
    }
  };

  const inputFieldClass = cn('input__field', {
    '--with-icon': img,
  });

  const height = name === 'comment' ? 128 : name === 'search' ? 64 : 64;
  const inputheight =
    name === 'comment'
      ? 128
      : name === 'search'
      ? 64
      : !props.isProfile
      ? 64
      : 24;

  const widthbase =
    name === 'comment' ? '738px' : name === 'search' ? 'none' : '630px';
  const widthmedium =
    name === 'comment' ? '738px' : name === 'search' ? 'none' : 'none';
  const widthmin =
    name === 'comment' ? 'none' : name === 'search' ? 'none' : 'none';

  return (
    <StyledWrapper
      height={height}
      widthbase={widthbase}
      inputheight={inputheight}
      widthmedium={widthmedium}
      widthmin={widthmin}
    >
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
            className={cn(inputFieldClass, props.inputClassName)}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
          />
        </div>
      </div>

      {errors && (
        <div className="error-message " style={styleParams}>
          {errors}
        </div>
      )}
      {!errors &&
        !props.isProfile &&
        name !== 'search' &&
        name !== 'comment' &&
        name !== 'passwordRep' && (
          <div style={styleParams}>Enter your {name}</div>
        )}
      {!errors && !props.isProfile && name === 'passwordRep' && (
        <div style={styleParams}>Repeat your password without errors</div>
      )}
    </StyledWrapper>
  );
};

export default BaseInput;

const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['widthbase', 'inputheight', 'widthmedium', 'widthmin'].includes(prop),
})<{
  height: number;
  widthbase: string;
  inputheight: number;
  widthmedium: string;
  widthmin: string;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* ${({ widthbase }) => widthbase && ` max-width: ${widthbase}px`}; */
  max-width: ${({ widthbase }) => widthbase};
  width: 100%;
  row-gap: 9px;
  ${({ theme }) => theme.media.tablet} {
    max-width: ${({ widthmedium }) => widthmedium};
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: ${({ widthmin }) => widthmin};
  }

  .input {
    display: flex;
    flex-direction: row;
    position: relative;
    /* height: 100%; */
    height: ${({ height }) => `${height}px`};
    width: 100%;
    border: 2px solid transparent;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    &:focus-within {
      border: 2px solid ${({ theme }) => theme.colors.dark_blue};
    }
  }

  .input__icon {
    position: absolute;
    padding: 20px;
    ${({ theme }) => theme.media.mobile} {
      padding: 16px 16px;
    }
  }
  .input__text-block {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
    height: auto;
  }

  .input__field {
    display: flex;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    align-items: center;
    height: ${({ inputheight }) => `${inputheight - 4}px`};
    /* max-width: ${({ widthbase }) => `${widthbase}px`}; */

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    padding-left: 5px;
    width: auto;
    /* border: none; */
    outline: none;

    &.--with-icon {
      padding-left: 64px;
    }

    ${({ theme }) => theme.media.mobile} {
      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
    }
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
    max-width: ${({ widthbase }) => widthbase};
    width: 100%;
    height: ${({ height }) => `${height}px`};
    display: flex;
    flex-direction: row;
    ${({ theme }) => theme.media.tablet} {
      max-width: ${({ widthmedium }) => widthmedium};
    }
    ${({ theme }) => theme.media.mobile} {
      max-width: ${({ widthmin }) => widthmin};

      width: auto;
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

  .--correct {
    padding-left: 0px;
  }

  .error-message {
    color: red;
  }
`;
