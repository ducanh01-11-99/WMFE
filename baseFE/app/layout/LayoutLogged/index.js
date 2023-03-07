import React from 'react';
import Cookies from 'js-cookie';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { COOKIES, PATH_LOGIN, PATH_PARTNER } from '../../utils/constants';

const LayoutLogged = ({ path, component: Component }) => {
  const token = Cookies.get(COOKIES.accessTokenTest);
  console.log(token);
  return (
    <Route
      render={() =>
        token ? (
          path === { PATH_PARTNER } ? (
            <Redirect to={PATH_PARTNER} />
          ) : (
            <div>
              <Component />
            </div>
          )
        ) : (
          <Redirect to={PATH_LOGIN} />
        )
      }
    />
  );
};

LayoutLogged.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
};

export default LayoutLogged;
