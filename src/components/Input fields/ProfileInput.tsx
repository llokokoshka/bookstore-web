import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputProps } from '../../lib/types';
import { useAppDispatch } from '../../hooks';
import { setUser } from '../../store/authSlice';

const ProfileInput: React.FC<InputProps> = (props) => {
  const [inputType, setInputType] = useState('password');
  let correctPassFlag = true;
  const { img, label, typeP, register, name, value, disable, errors } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (name !== 'password') {
      if (value) {
        register(name, { value: value });
      }
    } else register(name, { value: '******************' });
  });

  const handlerInputType = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  const editValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUser({
        name: e.target.value,
      })
    );
  };
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'password' && correctPassFlag) {
      e.target.value = '';
      correctPassFlag = false;
    }
  };
  return (
    <StyledWrapper>
      <div
        className="input input__field correct size"
        style={{
          display:
            disable === false &&
            (name === 'passwordNew' || name === 'passwordRep')
              ? 'block'
              : name === 'password' || name === 'fullName' || name === 'email'
              ? 'block'
              : 'none',
        }}
      >
        <div
          className="password__btn active"
          onClick={
            typeP === 'password' && !disable ? handlerInputType : undefined
          }
        >
          <img src={img} alt={typeP} className="input__icon" />
        </div>
        <div className="input__text-block">
          <div className="input__dark-title input-title">Your {label}</div>
          <input
            type={typeP === 'password' ? inputType : typeP}
            {...register(name)}
            onChange={editValue}
            onFocus={handlePass}
            disabled={disable}
            defaultValue={value}
            className="input__field pad-inp"
          />
        </div>
      </div>
      {name === 'email' && (
        <>
          {errors.email?.type === 'required' && (
            <div>Email - обязательное поле.</div>
          )}

          {errors.email ? <div>{errors.email.message}</div> : null}
        </>
      )}

      {name === 'password' && (
        <>
          {errors.password?.type === 'required' && (
            <div>Password - обязательное поле.</div>
          )}

          {errors.password ? <div>{errors.password.message}</div> : null}
        </>
      )}

      {name === 'fullName' && (
        <>
          {errors.fullName?.type === 'required' && (
            <div>Full Name - обязательное поле.</div>
          )}
          {errors.fullName ? <div>{errors.fullName.message}</div> : null}
        </>
      )}
      {name === 'passwordNew' && (
        <>
          {errors.passwordNew?.type === 'required' && (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              Password - обязательное поле.
            </div>
          )}
          {errors.passwordNew ? (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              {errors.passwordNew.message}
            </div>
          ) : (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              Enter your password
            </div>
          )}
        </>
      )}
      {name === 'passwordRep' && (
        <>
          {errors.passwordRep?.type === 'required' && (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              Password - обязательное поле.
            </div>
          )}
          {errors.passwordRep ? (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              {errors.passwordRep.message}
            </div>
          ) : (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              Repeat your password without errors
            </div>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

export default ProfileInput;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 9px;

  .size {
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

  .pad-inp {
    width: 448px;
    margin-left: 64px;
    padding-left: 5px;
  }
`;
