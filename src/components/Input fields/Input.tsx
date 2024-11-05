import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Props } from '../../lib/actionTypes';
import { useAppDispatch } from '../../hooks';
import { setUser } from '../../store/authSlice';

const Input: React.FC<Props> = (props) => {
  const [inputType, setInputType] = useState('password');
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

          {errors.email ? (
            <div>{errors.email.message}</div>
          ) : (
            <div>Enter your email</div>
          )}
        </>
      )}

      {name === 'password' && (
        <>
          {errors.password?.type === 'required' && (
            <div>Password - обязательное поле.</div>
          )}

          {errors.password ? (
            <div>{errors.password.message}</div>
          ) : (
            <div>Enter your password</div>
          )}
        </>
      )}

      {name === 'fullName' && (
        <>
          {errors.fullName?.type === 'required' && (
            <div>Full Name - обязательное поле.</div>
          )}
          {errors.fullName ? (
            <div>{errors.fullName.message}</div>
          ) : (
            <div>Enter your full name</div>
          )}
        </>
      )}
      {(name === 'passwordRep' || name === 'passwordNew') && (
        <>
          {errors.password?.type === 'required' && (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              Password - обязательное поле.
            </div>
          )}
          {errors.password ? (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              {errors.password.message}
            </div>
          ) : (
            <div
              style={{
                display: disable === false ? 'block' : 'none',
              }}
            >
              {' '}
              Enter your password
            </div>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

export default Input;

const StyledWrapper = styled.div`
  .size {
    width: 522px;
    height: 64px;
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
