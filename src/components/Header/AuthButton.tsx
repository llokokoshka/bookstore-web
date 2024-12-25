import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppPages } from '../../constants/textConstants';
import BaseButton from '../BaseComponents/BaseButton';
import styled from 'styled-components';

type Props = {
  page: string;
  buttonsClassName?: string;
};
const AuthButton: React.FC<Props> = (props) => {
  return (
    <Wrapper className={cn(props.buttonsClassName)}>
      {props.page === 'Login' ? (
        <Link className="todo-body__div-button" to={`${AppPages.registration}`}>
          <BaseButton text="Log in/Sign Up" />
        </Link>
      ) : (
        <Link className="todo-body__div-button" to={`${AppPages.login}`}>
          <BaseButton text="Log in/Sign Up" />
        </Link>
      )}
    </Wrapper>
  );
};

export default AuthButton;

const Wrapper = styled.div``;
