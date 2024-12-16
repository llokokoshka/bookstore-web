import React from 'react';
import { Link } from 'react-router-dom';

import { AppPages } from '../../constants/textConstants';

const AuthButton: React.FC<{ page: string }> = (props) => {
  return (
    <>
      {props.page === 'Login' ? (
        <Link className="todo-body__div-button" to={`${AppPages.registration}`}>
          <button className="base-button">Log in/Sign Up</button>
        </Link>
      ) : (
        <Link className="todo-body__div-button" to={`${AppPages.login}`}>
          <button className="base-button">Log in/Sign Up</button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
