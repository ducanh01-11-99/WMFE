import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginStyled, LoginWrapper } from './stylesLogin';

const Login = () => {
  const { t } = useTranslation();
  return (
    <LoginStyled>
      <LoginWrapper>
        <div>{t('login.guide')}</div>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;
