import { useState } from 'react';
import styled from 'styled-components';

import { Props } from '../../lib/actionTypes';

const Input: React.FC<Props> = (props) => {
  const [inputType, setInputType] = useState('password');
  const { img, typeP, value, isChangedInfo, isChangedPass, errors, inpReg } =
    props;
  const [inputValue, setInputValue] = useState(
    typeP === 'password' ? '******************' : value
  );

  const handlerInputType = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  const editValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <StyledWrapper>
      <div className="input input__field correct">
        <div
          className="password__btn active"
          onClick={typeP === 'password' ? handlerInputType : undefined}
        >
          <img src={img} alt={typeP} className="input__icon" />
        </div>
        <div className="input__text-block">
          <div className="input__dark-title input-title">
            Your {typeP === 'text' ? 'fullName' : typeP}
          </div>
          <input
            type={typeP === 'password' ? inputType : typeP}
            value={inputValue || ''}
            onChange={editValue}
            className="input__field"
            disabled={typeP === 'password' ? isChangedPass : isChangedInfo}
            {...inpReg}
          />
        </div>
      </div>
      {typeP === 'email' && (
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

      {typeP === 'password' && (
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

      {typeP === 'text' && <></>}
    </StyledWrapper>
  );
};

export default Input;

const StyledWrapper = styled.div`
  .size {
    max-width: 522px;
    height: 64px;
    width: 100%;
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
