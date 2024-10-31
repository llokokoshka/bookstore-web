import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormReduct } from '../../lib/actionTypes';
import { profileValidationSchema } from '../../schemas/profileValidationSchema';
import styled from 'styled-components';

type Props = {
  img: string;
  typeP: string;
  id: string;
  placeholder: string | undefined;
};

const Input: React.FC<Props> = (props) => {
  const [inputType, setInputType] = useState('password');
  const { img, typeP, id, placeholder } = props;
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

  return (
    <StyledWrapper>
      <div className="input size">
        <div
          className="password__btn active"
          onClick={typeP === 'password' ? changeInputTypeHandler : undefined}
        >
          <img src={img} alt={typeP} className="input__icon" />
        </div>
        <input
          type={typeP === 'password' ? inputType : typeP}
          id={id}
          placeholder={placeholder}
          className="input__field"
          {...registerField}
        />
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
    width: 100%;
  }
`;
