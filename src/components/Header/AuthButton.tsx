import React from 'react';
import { Link } from 'react-router-dom';

import { AppPages } from '../../constants/textConstants';
import BaseButton from '../BaseComponents/BaseButton';
import { IAuthButtonProps } from '../../lib/types';

const AuthButton: React.FC<IAuthButtonProps> = (props) => {
  return (
    <>
      {props.page === 'Login' ? (
        <Link className="todo-body__div-button" to={`${AppPages.registration}`}>
          <BaseButton text={`Log in/Sign Up`} />
        </Link>
      ) : (
        <Link className="todo-body__div-button" to={`${AppPages.login}`}>
          <BaseButton text={`Log in/Sign Up`} />
        </Link>
      )}
    </>
  );
};

export default AuthButton;
