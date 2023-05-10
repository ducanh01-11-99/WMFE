/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../res/theme/defaultTheme';
import LayoutNotLogin from '../../layout/LayoutNotLogin';

import {
  PATH_LOGIN,
  PATH_ROOT,
  PATH_HOMEPAGE,
  PATH_REGISTER,
  PATH_FORGET_PASSWORD,
} from '../../utils/constants';
import Login from '../Login/LoadableLogin';
import ErrorPage from '../../res/components/ErrorPage';
import Homepage from '../HomePage/Loadable';
import Register from '../Register/Loadable';
import ForgetPassword from '../ForgetPassword/Loadable';
import LayoutLogged from '../../layout/LayoutLogged';
import Garage from '../Garage/LoadableGarage';
import GarbageTruck from '../GarbageTruck/LoadableGarbageTruck';
import RecycleBin from '../RecycleBin/LoadableRecycleBin';
import Notification from '../Notification/LoadableNotifications';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch>
          <LayoutNotLogin exact path={PATH_ROOT} component={Homepage} />
          <LayoutNotLogin exact path={PATH_LOGIN} component={Login} />
          <LayoutNotLogin exact path={PATH_HOMEPAGE} component={Homepage} />
          <LayoutNotLogin path={PATH_REGISTER} component={Register} />
          <LayoutNotLogin
            path={PATH_FORGET_PASSWORD}
            component={ForgetPassword}
          />
          <LayoutLogged
            exact
            path="/garage"
            component={Garage}
            showSearch
            placeholderSearch="Tim kiem"
          />
          <LayoutLogged
            exact
            path="/garbageTruck"
            component={GarbageTruck}
            showSearch
            placeholderSearch="Tim kiem"
          />
          <LayoutLogged
            exact
            path="/RecycleBin"
            component={RecycleBin}
            showSearch
            placeholderSearch="Tim kiem"
          />
          <LayoutLogged
            exact
            path="/notification"
            component={Notification}
            showSearch
            placeholderSearch="Tim kiem"
          />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
      </>
    </ThemeProvider>
  );
}
