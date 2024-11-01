import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormReduct } from '../../lib/actionTypes';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import styled from 'styled-components';
import { Props } from '../../lib/actionTypes';

const Input: React.FC<Props> = (props) => {
  const [inputType, setInputType] = useState('password');
  const { img, typeP, id, placeholder, isChangedInfo, isChangedPass } = props;
  const [inputValue, setInputValue] = useState(placeholder);

  const {
    register,
    formState: { errors },
  } = useForm<IFormReduct>({
    mode: 'onChange',
    resolver: yupResolver(profileValidationSchema),
  });

  const changeInputTypeHandler = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  const registerField =
    typeP === 'email'
      ? register('email')
      : typeP === 'password'
      ? register('password')
      : typeP === 'text'
      ? register('fullName')
      : {};

  const editValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <StyledWrapper>
      <div className="input input__field correct">
        <div
          className="password__btn active"
          onClick={typeP === 'password' ? changeInputTypeHandler : undefined}
        >
          <img src={img} alt={typeP} className="input__icon" />
        </div>
        <div className="input__text-block">
          <div className="input__dark-title input-title">
            Your {typeP === 'text' ? 'fullName' : typeP}
          </div>
          <input
            type={typeP === 'password' ? inputType : typeP}
            id={id}
            value={typeP === 'password' ? '******************' : inputValue}
            onChange={editValue}
            className="input__field"
            {...registerField}
            disabled={typeP === 'password' ? isChangedPass : isChangedInfo}
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

      {typeP === 'text' && (
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
    /* position: absolute; */
  }
  .input__text-block {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
    /* position: relative; */
  }
  .correct {
    padding-left: 0px;
  }
`;
