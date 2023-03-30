import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginStyled, LoginWrapper } from './stylesLogin';
import Banner from '../HomePage/component/Banner';

const Login = () => {
  const { t } = useTranslation();
  return (
    <LoginStyled>
      <LoginWrapper>
        <div>Loginhere</div>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;
